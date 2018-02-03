import {Component, OnInit} from '@angular/core';
import {ProfilService} from './profil.service';
import {UserModel, ParcoursModel, VisitGuideModel} from './profil.model';
import {ImageModel} from '../image/image.model';
import {JwtHelper} from 'angular2-jwt';
import {GuideModel} from '../guide/guide.model';
import {ReviewsModel} from '../reviews/reviews.model';
import {AppService} from '../app.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css', '../../../node_modules/bulma/css/bulma.css', "../../../node_modules/font-awesome/css/font-awesome.css"],
  providers: [ProfilService]
})
export class ProfilComponent implements OnInit {

  userLog: UserModel;
  userGuide: GuideModel;
  userParcours: ParcoursModel[];
  isGuide: boolean;
  jwtHelper: JwtHelper = new JwtHelper();
  public show: boolean = false;
  public buttonName: any = 'Show';

  constructor(private profilService: ProfilService,
              private appService: AppService) {
  }

  toggle() {
    this.show = !this.show;

    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  ngOnInit() {
    let tokenDecoded = this.appService.decodeToken();
    
    console.info("tokenDecoded");
    console.info(tokenDecoded);

    this.isGuide = this.appService.initialiseIsGuide(tokenDecoded.roles);

    this.userLog = new UserModel(null,
      "", "", "", "", "", new ImageModel(null, "", ""));

    this.userGuide = new GuideModel(null, null, null, null, '',
      '', '', '', null, '', null);

    console.info("AVANT getUserLog")
    this.getUserLog(tokenDecoded.username);

    this.userParcours = [];
    console.info("AVANT getUserParcours")
    this.getUserParcours(tokenDecoded.username);
  }

  private getUserParcours(username: string) {
    this.profilService.getUserParcours(username)
      .then(data => {
        let parcours = data["hydra:member"];
        for (var i = 0; i < parcours.length; i++) {
          let parcoursI = parcours[i];
          let visitUser = [];

          let parcoursAdd = new ParcoursModel(parcoursI.id, visitUser, parcoursI.user, parcoursI.name);
          console.info("parcoursAdd ");
          console.info(parcoursAdd);
          this.userParcours.push(parcoursAdd);
        }

      });
  }

  private getUserLog(username: string) {
    if (this.isGuide) {
      this.profilService.getGuide(username).then(data => {
        const guide = data['hydra:member'][0];
        console.info("getGuide data[\"hydra:member\"][0]");
        console.info(data["hydra:member"][0]);

        const arrayListVisits: VisitGuideModel[] = new Array();

        // let arrayReviews:ReviewsModel[] = new Array();
        // let reviews = recupUser.guide.reviews;
        // for (var i = 0; i < reviews.length; i++) {
        //   let review :ReviewsModel = reviews[i];
        //   console.info("review i " + i);
        //   console.info(review);
        // }

        const image: ImageModel = this.appService.initialiseUserImage(guide.user);

        this.userLog = new UserModel(guide.user.id,
          guide.user.username, guide.user.gender, guide.user.firstname,
          guide.user.lastname, guide.user.mail, image);

        this.userGuide = new GuideModel(guide.id, guide.billfold, guide.reviews, this.userLog, guide.address,
          guide.country, guide.region, guide.city, guide.postalCode, guide.phoneNumber, arrayListVisits);

        console.info("this.userLog isGuide");
        console.info(this.userLog);
        console.info("this.userGuide isGuide");
        console.info(this.userGuide);
        localStorage.setItem("idUser", guide.user["@id"]);
      });

    } else {
      this.profilService.getUser(username)
        .then(data => {
          const user = data['hydra:member'][0];

          const image: ImageModel = this.appService.initialiseUserImage(user);

          this.userLog = new UserModel(user.id,
            user.username, user.gender, user.firstname,
            user.lastname, user.mail, image);
          console.info("this.userLog");
          console.info(this.userLog);
          localStorage.setItem("idUser", user["@id"]);
        });
    }
    
  }
}
