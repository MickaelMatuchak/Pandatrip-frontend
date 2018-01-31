import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../node_modules/bulma/css/bulma.css', "../../../node_modules/font-awesome/css/font-awesome.css"],
  providers: [ LoginService, AppService ]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.username = "";
    this.password = "";
  }

  onSubmit(event: any) {
    event.stopPropagation();
    this.loginService.logIn(this.username, this.password)
        .then( res => { 
          this.router.navigate(['profil']);
         })
        .catch( error => alert("Erreur sur la connection : " + error));
    ;
  }
}
