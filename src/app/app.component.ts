import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/bulma/css/bulma.css', '../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [ AppService ]
})

export class AppComponent implements OnInit, OnChanges {

  isConnected: boolean = false;
  isGuide: boolean = false;
  search: string = '';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private router: Router,
    private appService: AppService) {

    }

    ngOnInit(){
    console.error("APP ON-INIT Begin");
    this.isConnected = this.appService.loggedIn();
    if(this.isConnected) {
      let tokenDecoded = this.appService.decodeToken();
      this.isGuide = this.appService.initialiseIsGuide(tokenDecoded.roles);
    } else {
      this.isGuide = false;
    }
    console.error("APP ON-INIT End");
  }

  ngOnChanges() {
    console.error("APP ON-CHANGES Begin");
    this.isConnected = this.appService.loggedIn();
    if(this.isConnected) {
      let tokenDecoded = this.appService.decodeToken();
      this.appService.initialiseIsGuide(tokenDecoded.roles);
    } else {
      this.isGuide = false;
    }
    console.error("APP ON-CHANGES End");
  }

  logOut (event: any) {
    event.stopPropagation();
    this.appService.logOut();
    this.isConnected = false;
    this.isGuide = false;

    this.router.navigate( ['/home'] );
  }


}
