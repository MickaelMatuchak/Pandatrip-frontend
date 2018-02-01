import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
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

  getUser(username: string) {
    let url = `${this.endpointUrlUsers}?username=${username}`;

    return this.http.get(url)
           .toPromise()
           .then(response => response.json());
  }

  getGuide(username: string) {
    let url = `${this.endpointUrlUserGuides}?user.username=${username}`;

    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.info("response.json()");
        console.info(response.json());
        return response.json();
      });
  }

  getUserParcours(username: string) {
    let url = `${this.endpointUrlUserParcours}?user.username=${username}`;

    return this.http.get(url)
           .toPromise()
           .then(response => response.json());
  }

  postUserParcours(name: string, user: UserModel) {
    const url = AppService.entryPointUrl + '/parcours';

    const headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers })

    const bodyJSON = JSON.stringify ({
      'name': name,
      'user': user.id
    });

    return this.http
      .post(url, bodyJSON, options)
      .toPromise()
      .then()
      .catch(error => Promise.reject(error.message || error));
  }
}
