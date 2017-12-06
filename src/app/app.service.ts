import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { VisitModel } from './visit/visit.model';
import { Http, Response } from '@angular/http';

@Injectable()
export class AppService {
  constructor(private http: Http) {}

  private endpointUrl = 'http://127.0.0.1:8000/visits';

  getVisits(): Observable<VisitModel[]> {
    return this.http.get(this.endpointUrl)
      .map((response: Response) => {
        const result = response.json();
        return result;
      })
      .catch((error: Response | any) => {
        return Observable.throw(error.statusText);
      });
  }
}
