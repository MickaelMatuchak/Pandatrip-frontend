import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { DatePipe } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../node_modules/bulma/css/bulma.css', "../../../node_modules/font-awesome/css/font-awesome.css"],
  providers: [ RegisterService, LoginService, DatePipe ]
})
export class RegisterComponent implements OnInit {

  username: string;
  gender: string;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  password2: string;

  constructor(
    private registerService: RegisterService,
    private loginService: LoginService,
    private appService: AppService,
    private datePipe: DatePipe,
    private router: Router) { }

  ngOnInit() {
    this.username = "";
    this.gender = "";
    this.firstname = "";
    this.lastname = "";
    this.mail = "";
    this.password = "";
    this.password2 = "";
  }
  
  onSubmit(event: any) {
    event.stopPropagation();
    if( this.password == "" || this.password2 == "" || this.password != this.password2) {
      alert("Les mots de passe ne sont pas identiques");
    } else {
      let date = this.datePipe.transform(Date.now(),  'yyyy-MM-dd HH:mm:ss');

      this.registerService.signUp(this.username, this.gender, this.password, 
        this.firstname, this.lastname, this.mail, date)
        .then( res => {
          this.loginService.logIn(this.username, this.password)
          .then(token => {
            this.appService.saveTokenInLocal(token);
            this.router.navigate(['profil']);
          })
          .catch( error => alert("Erreur sur la connection : \n" + error));
         })
        .catch( error => alert("Erreur  : \n" + error));
    }
  }
}
