import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { LoginModel } from './login.model';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import { AppService } from '../app.service';

@Injectable()
export class LoginService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor( private http: Http ) { }

  logOut() {
    localStorage.removeItem('token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logIn(username: string, password: string): Promise<any> {
    
    let url = AppService.entryPointUrl + '/login_check';

    let headers = new Headers({ 'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' });
    
    let bodyFormData = '------WebKitFormBoundary7MA4YWxkTrZu0gW';
    bodyFormData += '\nContent-Disposition: form-data; name="_username"';

    bodyFormData += '\n\n' + username;
    bodyFormData += '\n------WebKitFormBoundary7MA4YWxkTrZu0gW';
    bodyFormData += '\nContent-Disposition: form-data; name="_password"';

    bodyFormData += '\n\n' + password;
    bodyFormData += '\n------WebKitFormBoundary7MA4YWxkTrZu0gW--';

    let options = new RequestOptions({ headers: headers })

    return this.http
            .post(url, bodyFormData, options)
            .toPromise()
            .then(res => {
              var data = res.json();
              this.saveTokenInLocal(data.token);
            })
            .catch(error => Promise.reject(error.message || error));
  }

  private saveTokenInLocal(token: string) {
    console.info("token ");
    console.info(token);
    localStorage.setItem('token', token);
    
    console.log("this.jwtHelper.decodeToken(token) ");
    console.log(this.jwtHelper.decodeToken(token));
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    window.alert("Erreur. \n Cause Technique :\n"+JSON.stringify(error));
    return Promise.reject(error.message || error);
  }
}
