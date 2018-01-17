import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { ThemeModel } from './theme.model';
import { Http, Response } from '@angular/http';
import { AppService } from '../app.service';

@Injectable()
export class ThemeService {
  constructor(private http: Http) {}

  private endpointUrl = AppService.entryPointUrl + '/themes';

  getThemes(): Observable<ThemeModel[]> {
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
