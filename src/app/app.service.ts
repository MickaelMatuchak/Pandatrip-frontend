import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AppService {
  constructor( 
    private http: Http ) {}
  
  public static entryPointUrl: string = 'https://pandatrip.herokuapp.com/api';

}
