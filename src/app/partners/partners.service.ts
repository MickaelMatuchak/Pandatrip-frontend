import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { AppService } from '../app.service';

@Injectable()
export class PartnersService {

  constructor( private http: Http ) { }

  becomeGuide(
    address: string, country: string, region: string, 
    city: string, postalCode: number, phoneNumber: string, token: string) {
      
      let url = AppService.entryPointUrl + '/guides';
  
      let headers = new Headers({ 'Content-Type':'application/json',
                                  'Authorization':'Bearer '+token });
      
      let bodyJSON = JSON.stringify ( {
        'address' : address,
        'country' : country,
        'region' : region,
        'city' : city,
        'postalCode': postalCode,
        'phoneNumber' : phoneNumber
      });
  
      let options = new RequestOptions({ headers: headers })
  
      return this.http
              .post(url, bodyJSON, { headers: headers })
              .toPromise()
              .then()
              .catch(error => Promise.reject(error.message || error));
    }

}
