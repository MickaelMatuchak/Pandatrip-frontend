import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import { AppService } from '../app.service';
import { JwtHelper } from 'angular2-jwt';
import {UserModel} from "./profil.model";

@Injectable()
export class ProfilService {

  private endpointUrlUsers = AppService.entryPointUrl + '/users';
  private endpointUrlUserParcours = AppService.entryPointUrl + '/parcours';
  private endpointUrlUserGuides = AppService.entryPointUrl + '/guides';

  jwtHelper: JwtHelper = new JwtHelper();

  constructor( private http: Http ) { }

  getUser() {
    let recupTokenStored = localStorage.getItem("token");
    let tokenDecoded = this.jwtHelper.decodeToken(recupTokenStored);
    console.info("tokenDecoded User ");
    console.error(tokenDecoded);
    let url = `${this.endpointUrlUsers}?username=${tokenDecoded["username"]}`;

    return this.http.get(url)
           .toPromise()
           .then(response => response.json());
  }

  getGuide() {
    let recupTokenStored = localStorage.getItem("token");
    let tokenDecoded = this.jwtHelper.decodeToken(recupTokenStored);
    console.info("tokenDecoded User ");
    console.error(tokenDecoded);
    let url = `${this.endpointUrlUserGuides}?username=${tokenDecoded["username"]}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }

  getUserParcours() {
    let recupTokenStored = localStorage.getItem("token");
    let tokenDecoded = this.jwtHelper.decodeToken(recupTokenStored);
    console.info("tokenDecoded UserParcours ");
    console.error(tokenDecoded);
    let url = `${this.endpointUrlUserParcours}?user.username=${tokenDecoded["username"]}`;

    return this.http.get(url)
           .toPromise()
           .then(response => response.json());
  }

  postUserParcours(name: string, user: UserModel) {
    const url = AppService.entryPointUrl + '/parcours';

    const headers = new Headers({ 'Content-Type': 'application/json' });

    const bodyJSON = JSON.stringify ({
      'name': name,
      'user': user.id
    });

    return this.http
      .post(url, bodyJSON, headers)
      .toPromise()
      .then()
      .catch(error => Promise.reject(error.message || error));
  }
}
