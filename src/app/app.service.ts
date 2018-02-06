import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {ImageModel} from './image/image.model';
import {UserModel} from './profil/profil.model';
import {AppSharedService} from './app-shared-service';

@Injectable()
export class AppService {
  constructor(private http: Http, private appSharedService: AppSharedService) {
  }

  public static entryPointUrl: string = 'https://pandatrip.herokuapp.com/api';

  jwtHelper: JwtHelper = new JwtHelper();

  logOut() {
    localStorage.removeItem('token');
    this.appSharedService.emitChange(false);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  saveTokenInLocal(token: string) {
    localStorage.setItem('token', token);
    this.appSharedService.emitChange(true);
  }

  getLocalVar(key: string) {
    // Regarde si le token n'est pas expiré
    if (key === 'token') {
      if (localStorage.getItem(key) !== null) {

        const tokenDecoded = this.decodeToken();
        const timeNow = parseInt(Date.now() / 1000 + '', 10);

        console.log('now : ' + timeNow);
        console.log('token : ' + tokenDecoded['exp']);

        if (tokenDecoded['exp'] < timeNow) {
          this.logOut();
          alert('Votre session a expiré');
        }
      }
    }

    if (localStorage.getItem(key) !== null) {
      return localStorage.getItem(key);
    }

    return null;
  }

  decodeToken() {
    const recupTokenStored = localStorage.getItem('token');

    if (recupTokenStored !== null) {
      const tokenDecoded = this.jwtHelper.decodeToken(recupTokenStored);
      return tokenDecoded;
    }

    return null;
  }

  initialiseIsGuide(roles: string[]): boolean {
    let isGuide;

    for (let i = 0; i < roles.length; i++) {
      isGuide = ( roles[i] === 'ROLE_GUIDE' );
    }

    return isGuide;
  }

  initialiseUserImage(recupUser: UserModel): ImageModel {
    let image: ImageModel;

    if (recupUser.image) {
      image = new ImageModel(recupUser.image.id, recupUser.image.url, recupUser.image.description);
    } else {
      if (recupUser.gender === 'male') {
        image = new ImageModel(null, 'boy.png', 'boy');
      } else {
        image = new ImageModel(null, 'girl.png', 'girl');
      }
    }

    return image;
  }
}
