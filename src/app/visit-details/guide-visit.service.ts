import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AppService} from '../app.service';
import {GuideVisitModel} from './guide-visit.model';
import {VisitGuideModel} from "../profil/profil.model";

@Injectable()
export class GuideVisitService {
  constructor(private http: Http) {
  }

  private endpointUrl = AppService.entryPointUrl + '/visit_guides';

  getGuidesByVisit(idVisit: number): Promise<GuideVisitModel[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.endpointUrl + '?visit=' + idVisit + '&isAvailable=true')
      .toPromise()
      .then(response => response.json());
  }

  postGuideVisit(visitGuide: VisitGuideModel, token) {
    const url = AppService.entryPointUrl + '/visit_guides';

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const options = new RequestOptions({ headers: headers });

    const bodyJSON = JSON.stringify ({
      'visit': '/api/visits/' + visitGuide.visit.id,
      'guide': '/api/guides/' + visitGuide.guide.id,
      'duration': visitGuide.duration,
      'price': visitGuide.price,
      'isAvailable': visitGuide.isAvailable,
      'date': visitGuide.date
  });

    return this.http
      .post(url, bodyJSON, options)
      .toPromise()
      .then()
      .catch(error => Promise.reject(error.message || error));
  }
}
