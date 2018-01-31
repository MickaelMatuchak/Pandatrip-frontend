import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { AppService } from '../app.service';

@Injectable()
export class RegisterService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor( private http: Http ) { }

  signUp(
    username: string, gender: string, password: string, firstname: string, lastname: string,
    mail: string, date: string): Promise<any> {
      
    let url = AppService.entryPointUrl + '/users';

    let headers = new Headers({ 'Content-Type':'application/json' });
    
    let bodyJSON = JSON.stringify ( {
      'username': username,
      'gender': gender,
      'password': password,
      'firstname': firstname,
      'lastname': lastname,
      'mail': mail,
      'registrationDate': date,
      'connexionDate': date
    });

    let options = new RequestOptions({ headers: headers })

    return this.http
            .post(url, bodyJSON, { headers: headers })
            .toPromise()
            .then()
            .catch(error => Promise.reject(error.message || error));
  }


}
