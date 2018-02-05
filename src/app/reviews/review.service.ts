import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import {ReviewsModel} from './reviews.model';

@Injectable()
export class ReviewService {

  private endpointUrlReviews = AppService.entryPointUrl + '/reviews';

  constructor( private http: Http ) { }

  postReview(review: ReviewsModel, token: string) {

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const options = new RequestOptions({ headers: headers });

    const bodyJSON = JSON.stringify ({
      'note': review.note,
      'title': review.title,
      'text': review.text,
      'date': review.date,
      'user': '/api/users/' + review.user.id
    });

    return this.http
      .post(this.endpointUrlReviews, bodyJSON, options)
      .toPromise()
      .then()
      .catch(error => Promise.reject(error.message || error));
  }
}
