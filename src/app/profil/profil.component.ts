import { Component, OnInit } from '@angular/core';
import { ProfilService } from './profil.service';
import { UserModel, ParcoursModel } from './profil.model';
import { ImageModel } from '../image/image.model';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css', '../../../node_modules/bulma/css/bulma.css', "../../../node_modules/font-awesome/css/font-awesome.css"],
  providers: [ ProfilService ]
})
export class ProfilComponent implements OnInit {

  userLog: UserModel;
  userParcours: ParcoursModel[];
  isGuide: boolean;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private profilService: ProfilService ) { }

  ngOnInit() {
    let recupTokenStored = localStorage.getItem("token");
    let tokenDecoded = this.jwtHelper.decodeToken(recupTokenStored);
    this.viewIsGuide(tokenDecoded.roles);

    this.userLog = new UserModel(null, 
      "", "", "","", "", new ImageModel(null, "", ""));
    this.getUserLog();

    this.userParcours = [];
    this.getUserParcours();
  }

  private viewIsGuide(roles: string[]) {
    for(var i = 0; i < roles.length; i++) {
      this.isGuide = ( roles[i] == "ROLE_GUIDE" );
      console.info("this.isGuide " + i);
      console.info(this.isGuide);
    }
  }

  private getUserParcours() {
    this.profilService.getUserParcours()
      .then(data => {
        console.info(data["hydra:member"]);
        let parcours = data["hydra:member"];
        for(var i = 0; i < parcours.length; i++) {
          let parcoursI = parcours[i];
          let visitUser = [];

          let parcoursAdd = new ParcoursModel(parcoursI.id, visitUser, parcoursI.user, parcoursI.name);
          console.info("parcoursAdd ");
          console.info(parcoursAdd);
          this.userParcours.push( parcoursAdd );
        }
        
      })
  }
  
  private getUserLog() {
    this.profilService.getUser()
      .then(data => {
        let recupUser = data["hydra:member"][0];
        console.info("recupUser");
        console.info(recupUser);
        let image: ImageModel;
        if (recupUser.image) {
          image = new ImageModel(recupUser.image.id, recupUser.image.url, recupUser.image.description);
        } else {
          if (recupUser.gender == 'male') {
            image = new ImageModel(null, "boy.png", "boy");
          } else {
            image = new ImageModel(null, "girl.png", "girl");
          }
        }

        this.userLog = new UserModel(recupUser.id, 
          recupUser.username, recupUser.gender, recupUser.firstname,
          recupUser.lastname, recupUser.mail, image);
        console.info("this.userLog");
        console.info(this.userLog);
      });
  }
}
