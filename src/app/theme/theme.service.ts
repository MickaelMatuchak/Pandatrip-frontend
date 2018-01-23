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

  getThemes(): Promise<ThemeModel[]> {
    return this.http.get(this.endpointUrl)
          .toPromise()
          .then(response => response.json());
  }

  getNumbersThemes(nbThemes: number): Promise<ThemeModel[]> {
    let url = `${this.endpointUrl}?itemsPerPage=` + nbThemes;

    return this.http.get(url)
          .toPromise()
          .then(response => response.json());
  }

  getTheme(name: string) {
    let url = `${this.endpointUrl}?name=${name}&pagination=false`;

    return this.http.get(url)
           .toPromise()
           .then(response => response.json());
  }

}
