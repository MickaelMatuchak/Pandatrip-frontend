import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { ThemeModel } from './theme.model';
import { Http, Headers, Response } from '@angular/http';
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

  getThemesPromise(): Promise<ThemeModel[]> {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json');

    return this.http.get(this.endpointUrl)
          .toPromise()
          .then(response => response.json());
  }

  getTheme(id: number) {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json');

    //let url = `${this.endpointUrl}/${id}`;
    let url = `${this.endpointUrl}/1`;

    return this.http.get(url)
           .toPromise()
           .then(response => response.json());
  }

}
