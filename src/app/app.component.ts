import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/bulma/css/bulma.css'],
  providers: [ LoginService ]
})



export class AppComponent implements OnInit, OnChanges {

  @Output() onVoted = new EventEmitter<boolean>();
  isConnected: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService) {}

  ngOnInit() {
    this.isConnected = this.loginService.loggedIn();
    console.error("APP ON-INIT");
  } 

  ngOnChanges() {
    this.isConnected = this.loginService.loggedIn();
    console.error("APP ON-CHANGES");
  } 

  logOut (event: any) { 
    event.stopPropagation();
    this.loginService.logOut();
    this.isConnected = false;
    
    this.router.navigate( ['/home'] );
  }
}
