import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {AppService} from '../app.service';

@Injectable()
export class RegisterService {

  constructor(private http: Http) {
  }

  signUp(username: string, gender: string, password: string, firstname: string, lastname: string,
         mail: string, date: string): Promise<any> {

    const url = AppService.entryPointUrl + '/users';

    const headers = new Headers({'Content-Type': 'application/json'});

    const bodyJSON = JSON.stringify({
      'username': username,
      'gender': gender,
      'password': password,
      'firstname': firstname,
      'lastname': lastname,
      'mail': mail,
      'registrationDate': date,
      'connexionDate': date
    });

    const options = new RequestOptions({headers: headers});

    return this.http
      .post(url, bodyJSON, options)
      .toPromise()
      .then()
      .catch(error => Promise.reject(error.message || error));
  }
}
