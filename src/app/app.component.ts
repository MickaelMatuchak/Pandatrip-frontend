import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/bulma/css/bulma.css', '../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [ LoginService ]
})

export class AppComponent implements OnInit, OnChanges {

  isConnected: boolean = false;
  isGuide: boolean = false;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private router: Router,
    private loginService: LoginService) {}

  ngOnInit() {
    console.error("APP ON-INIT Begin");
    this.isConnected = this.loginService.loggedIn();
    if(this.isConnected) {
      let tokenDecoded = this.decodeToken();
      this.initialiseIsGuide(tokenDecoded.roles);
    } else {
      this.isGuide = false;
    }
    console.error("APP ON-INIT End");
  }

  ngOnChanges() {
    console.error("APP ON-CHANGES Begin");
    this.isConnected = this.loginService.loggedIn();
    if(this.isConnected) {
      let tokenDecoded = this.decodeToken();
      this.initialiseIsGuide(tokenDecoded.roles);
    } else {
      this.isGuide = false;
    }
    console.error("APP ON-CHANGES End");
  }

  private decodeToken() {
    let recupTokenStored = localStorage.getItem("token");
    let tokenDecoded = this.jwtHelper.decodeToken(recupTokenStored);
    return tokenDecoded;
  }

  private initialiseIsGuide(roles: string[]) {
    for(var i = 0; i < roles.length; i++) {
      this.isGuide = ( roles[i] == "ROLE_GUIDE" );
    }
  }

  logOut (event: any) {
    event.stopPropagation();
    this.loginService.logOut();
    this.isConnected = false;
    this.isGuide = false;

    this.router.navigate( ['/home'] );
  }
}
