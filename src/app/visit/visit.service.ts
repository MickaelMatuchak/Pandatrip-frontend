import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Injectable} from '@angular/core';
import {VisitModel} from './visit.model';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {AppService} from '../app.service';
import {ReviewsModel} from "../reviews/reviews.model";

@Injectable()
export class VisitService {
  constructor(private http: Http) {
  }

  private endpointUrl = AppService.entryPointUrl + '/visits';

  getVisits(): Promise<VisitModel[]> {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json');

    return this.http.get(this.endpointUrl)
      .toPromise()
      .then(response => response.json());
  }

  getNumbersVisits(nbVisits: number): Promise<VisitModel[]> {
    let url = `${this.endpointUrl}?postalCode[between]=59000..59999&itemsPerPage=` + nbVisits;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }

  getVisit(name: string) {
    let url = `${this.endpointUrl}?name=${name}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }


  addReview(visit: VisitModel, token: string) {
    const url = AppService.entryPointUrl + '/visits/' + visit.id;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const options = new RequestOptions({headers: headers});

    let arrayReviews: Array<string> = [];

    visit.reviews.forEach(function (element: ReviewsModel) {
      arrayReviews.push('/api/reviews/' + element.id);
    });

    const bodyJSON = JSON.stringify({
      'reviews': arrayReviews
    });

    return this.http
      .put(url, bodyJSON, options)
      .toPromise()
      .then()
      .catch(error => Promise.reject(error.message || error));
  }
}
