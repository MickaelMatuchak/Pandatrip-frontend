import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AppService} from '../app.service';
import {UserModel, VisitGuideModel, VisitUser} from "./profil.model";
import {ItemVisitModel} from "../visit-details/item-visit.model";

@Injectable()
export class ProfilService {

  private endpointUrlUsers = AppService.entryPointUrl + '/users';
  private endpointUrlUserParcours = AppService.entryPointUrl + '/parcours';
  private endpointUrlUserGuides = AppService.entryPointUrl + '/guides';
  private endpointUrlVisiteursUsers = AppService.entryPointUrl + '/visit_users';

  constructor(private http: Http) {
  }

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
        return response.json();
      });
  }

  getUserParcours(username: string) {
    let url = `${this.endpointUrlUserParcours}?user.username=${username}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }

  getVisitsUserValidated(username: string) {
    let url = `${this.endpointUrlVisiteursUsers}?visitGuide.guide.user.username=${username}&isValidated=true&isConfirm=true`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }

  getVisitsUserWaiting(username: string) {
    let url = `${this.endpointUrlVisiteursUsers}?visitGuide.guide.user.username=${username}&isValidated=false`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }

  postVisitsUser(name: string, idUser: string, token: string) {
    const url = this.endpointUrlVisiteursUsers;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const options = new RequestOptions({headers: headers});

    const bodyJSON = JSON.stringify({
      'name': name,
      'user': '/api/users/' + idUser
    });

    return this.http
      .post(url, bodyJSON, options)
      .toPromise()
      .then()
      .catch(error => Promise.reject(error.message || error));
  }

  postUserParcours(name: string, idUser: string, token: string) {
    const url = this.endpointUrlUserParcours;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const options = new RequestOptions({headers: headers});

    const bodyJSON = JSON.stringify({
      'name': name,
      'user': '/api/users/' + idUser
    });

    return this.http
      .post(url, bodyJSON, options)
      .toPromise()
      .then()
      .catch(error => Promise.reject(error.message || error));
  }

  putUserVisit(isConfirm: boolean, id: number, token: string) {
    const url = this.endpointUrlVisiteursUsers + '/' + id;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const options = new RequestOptions({headers: headers});

    const bodyJSON = JSON.stringify({
      'isConfirm': isConfirm,
      'isValidated': true
    });

    return this.http
      .put(url, bodyJSON, options)
      .toPromise()
      .then()
      .catch(error => Promise.reject(error.message || error));
  }

  postUserVisit(itemVisit: ItemVisitModel, token: string) {
    const url = this.endpointUrlVisiteursUsers;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const options = new RequestOptions({headers: headers});

    let visitGuide = null;

    if (itemVisit.guideVisit !== null) {
      visitGuide = '/api/visit_guides/' + itemVisit.guideVisit.id;
    }

    const bodyJSON = JSON.stringify({
      'visit': '/api/visits/' + itemVisit.visit.id,
      'user': itemVisit.user,
      'visitGuide': visitGuide,
      'isValidated': itemVisit.isValidated,
      'parcours': itemVisit.parcours
    });

    return this.http
      .post(url, bodyJSON, options)
      .toPromise()
      .then()
      .catch(error => Promise.reject(error.message || error));
  }
}
