import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppService} from '../app.service';
import {GuideVisitModel} from './guide-visit.model';

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
}
