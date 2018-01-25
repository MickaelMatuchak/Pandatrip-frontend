import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LoginModel } from './login.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }
  
  save(username: string, password: string): Promise<any>  {
    return this.post(username, password);
  }

  // Add new TemplateStatistic
  private post(username: string, password: string): Promise<any> {
    let headers = new Headers();
    headers.append("Content-Type", 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');

    console.info("username");
    console.info(username);
    console.info("password");
    console.info(password);
    

    const bodyJSON = {'_username':"Loic",'_password':"admin"};

    
    let bodyFormData = '------WebKitFormBoundary7MA4YWxkTrZu0gW';
    bodyFormData += '\nContent-Disposition: form-data; name="_username"';

    bodyFormData += '\n\n' + username;
    bodyFormData += '\n------WebKitFormBoundary7MA4YWxkTrZu0gW';
    bodyFormData += '\nContent-Disposition: form-data; name="_password"';

    bodyFormData += '\n\n' + password;
    bodyFormData += '\n------WebKitFormBoundary7MA4YWxkTrZu0gW--';

    let logM = new LoginModel(username, password);

    let url = 'https://pandatrip.herokuapp.com/login_check';

    console.error(bodyJSON);
    console.info(bodyFormData);
    return this.http
            .post(url, bodyFormData, {headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    window.alert("Erreur. \n Cause Technique :\n"+JSON.stringify(error));
    return Promise.reject(error.message || error);
  }
}
