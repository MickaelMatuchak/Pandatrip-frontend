import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LoginModel } from './login.model';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }
  
  save(username: string, password: string): Promise<any>  {
    return this.post(username, password);
  }

  // Add new TemplateStatistic
  private post(username: string, password: string): any {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json');

    console.info("username");
    console.info(username);
    console.info("password");
    console.info(password);
    
    const budy = {'_username':"Loic",'_password':"admin"};
    let budy2 = new Map();
    budy2.set("_username","Loic");
    budy2.set("_password","admin");

    let body = new URLSearchParams();
    body.append('username', 'Loic');
    body.append('password', 'admin');

    let logM = new LoginModel(username, password);

    let url = 'https://pandatrip.herokuapp.com/login_check';

    console.info(url);
    console.error(budy);
    console.error(budy2);
    console.error(body.toString());
    return this.http
            .post(url, body.toString())
            .subscribe(data => {
              console.info(data);
            }, error => {
              console.info('Something went wrong! \n '+JSON.stringify(error));
            });
            // .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    window.alert("Erreur. \n Cause Technique :\n"+JSON.stringify(error));
    return Promise.reject(error.message || error);
  }
}
