import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { ImageModel } from './image/image.model';
import { UserModel } from './profil/profil.model';

@Injectable()
export class AppService {
  constructor( 
    private http: Http ) {}
  
  jwtHelper: JwtHelper = new JwtHelper();

  public static entryPointUrl: string = 'https://pandatrip.herokuapp.com/api';
  
  logOut() {
    localStorage.removeItem('token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  saveTokenInLocal(token: string) {
    console.info("token ");
    console.info(token);
    localStorage.setItem('token', token);
  }

  decodeToken() {
    let recupTokenStored = localStorage.getItem("token");
    let tokenDecoded = this.jwtHelper.decodeToken(recupTokenStored);
    return tokenDecoded;
  }

  initialiseIsGuide(roles: string[]) : boolean {
    let isGuide;
    for(var i = 0; i < roles.length; i++) {
      isGuide = ( roles[i] == "ROLE_GUIDE" );
    }
    return isGuide;
  }

  initialiseUserImage(recupUser: UserModel): ImageModel {
    let image: ImageModel ;
    if (recupUser.image) {
      image = new ImageModel(recupUser.image.id, recupUser.image.url, recupUser.image.description);
    } else {
      if (recupUser.gender == 'male') {
        image = new ImageModel(null, "boy.png", "boy");
      } else {
        image = new ImageModel(null, "girl.png", "girl");
      }
    }
    return image;  
  }
}
