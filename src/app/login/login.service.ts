import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AppService} from '../app.service';

@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }

  logIn(username: string, password: string): Promise<any> {

    const url = AppService.entryPointUrl + '/login_check';

    const headers = new Headers({'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'});

    let bodyFormData = '------WebKitFormBoundary7MA4YWxkTrZu0gW';
    bodyFormData += '\nContent-Disposition: form-data; name="_username"';

    bodyFormData += '\n\n' + username;
    bodyFormData += '\n------WebKitFormBoundary7MA4YWxkTrZu0gW';
    bodyFormData += '\nContent-Disposition: form-data; name="_password"';

    bodyFormData += '\n\n' + password;
    bodyFormData += '\n------WebKitFormBoundary7MA4YWxkTrZu0gW--';

    const options = new RequestOptions({headers: headers});

    return this.http
      .post(url, bodyFormData, options)
      .toPromise()
      .then(res => res.json().token)
      .catch(error => Promise.reject(error.message || error));
  }

  private handleError(error: any) {
    window.alert('Erreur. \n Cause Technique :\n' + JSON.stringify(error));
    return Promise.reject(error.message || error);
  }
}
