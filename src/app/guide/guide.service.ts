import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import {AppService} from '../app.service';
import {GuideModel} from './guide.model';

@Injectable()
export class GuideService {

  private endpointUrlGuides = AppService.entryPointUrl + '/guides';

  constructor(private http: Http) {
  }

  getGuides() {
    return this.http.get(this.endpointUrlGuides)
      .toPromise()
      .then(response => response.json());
  }


  getNumbersGuides(nbGuides: number): Promise<GuideModel[]> {
    const url = `${this.endpointUrlGuides}?itemsPerPage=` + nbGuides;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }

  getGuide(name: string) {
    const url = `${this.endpointUrlGuides}?user.username=${name}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }
}
