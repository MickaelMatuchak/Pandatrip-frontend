import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import {ThemeModel} from './theme.model';
import {AppService} from '../app.service';

@Injectable()
export class ThemeService {

  private endpointUrlThemes = AppService.entryPointUrl + '/themes';

  constructor(private http: Http) {
  }

  getThemes(): Promise<ThemeModel[]> {
    return this.http.get(this.endpointUrlThemes)
      .toPromise()
      .then(response => response.json());
  }

  getNumbersThemes(nbThemes: number): Promise<ThemeModel[]> {
    const url = `${this.endpointUrlThemes}?itemsPerPage=` + nbThemes;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }

  getTheme(name: string) {
    const url = `${this.endpointUrlThemes}?name=${name}&pagination=false`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }
}
