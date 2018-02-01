import {Component, OnInit} from '@angular/core';
import {ProfilService} from './profil.service';
import {UserModel, ParcoursModel, VisitGuideModel} from './profil.model';
import {ImageModel} from '../image/image.model';
import {JwtHelper} from 'angular2-jwt';
import {GuideModel} from '../guide/guide.model';
import {ReviewsModel} from '../reviews/reviews.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css', '../../../node_modules/bulma/css/bulma.css', "../../../node_modules/font-awesome/css/font-awesome.css"],
  providers: [ProfilService]
})
export class ProfilComponent implements OnInit {

  userLog: UserModel;
  userParcours: ParcoursModel[];
  isGuide: boolean;
  jwtHelper: JwtHelper = new JwtHelper();
  public show:boolean = false;
  public buttonName:any = 'Show';

  constructor(
    private profilService: ProfilService,
    private appService: AppService) {
  }

  toggle() {
    this.show = !this.show;

    if(this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  ngOnInit() {
    let tokenDecoded = this.appService.decodeToken();
    this.isGuide = this.appService.initialiseIsGuide(tokenDecoded.roles);

    this.userLog = new UserModel(null,
      "", "", "", "", "", new ImageModel(null, "", ""), new GuideModel(null, null, null, null, "", "", "", "", null, "", null));
    console.info("AVANT getUserLog")
    this.getUserLog();

    this.userParcours = [];
    console.info("AVANT getUserParcours")
    this.getUserParcours();
  }

  private getUserParcours() {
    this.profilService.getUserParcours()
      .then(data => {
        console.info(data["hydra:member"]);
        let parcours = data["hydra:member"];
        for (var i = 0; i < parcours.length; i++) {
          let parcoursI = parcours[i];
          let visitUser = [];

          let parcoursAdd = new ParcoursModel(parcoursI.id, visitUser, parcoursI.user, parcoursI.name);
          console.info("parcoursAdd ");
          console.info(parcoursAdd);
          this.userParcours.push(parcoursAdd);
        }

      })
  }

  private getUserLog() {
    this.profilService.getUser()
      .then(data => {
        let recupUser = data["hydra:member"][0];
        console.info("recupUser");
        console.info(recupUser);
        let image: ImageModel = this.appService.initialiseUserImage(recupUser);

        // let arrayReviews:ReviewsModel[] = new Array();
        // let reviews = recupUser.guide.reviews;
        // for (var i = 0; i < reviews.length; i++) {
        //   let review :ReviewsModel = reviews[i];
        //   console.info("review i " + i);
        //   console.info(review);
        // }
        let arrayListVisits: VisitGuideModel[] = new Array();

        let guide = null;
        if (recupUser.guide !== null) {
          let recupGuide = recupUser.guide;

          guide = new GuideModel(recupGuide.id, recupGuide.billfold, null, null, recupGuide.address, recupGuide.country,
            recupGuide.region, recupGuide.city, recupGuide.postalCode, recupGuide.phoneNumber, arrayListVisits);
        }
        this.userLog = new UserModel(recupUser.id,
          recupUser.username, recupUser.gender, recupUser.firstname,
          recupUser.lastname, recupUser.mail, image, guide);
      });
  }
}
