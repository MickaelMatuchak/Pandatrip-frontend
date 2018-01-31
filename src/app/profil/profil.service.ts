import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppService } from '../app.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class ProfilService {

  private endpointUrlUsers = AppService.entryPointUrl + '/users';
  private endpointUrlUserParcours = AppService.entryPointUrl + '/parcours';

  jwtHelper: JwtHelper = new JwtHelper();

  constructor( private http: Http ) { }

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
}
