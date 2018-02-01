import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnersService } from './partners.service';
import { LoginService } from '../login/login.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css', '../../../node_modules/bulma/css/bulma.css', "../../../node_modules/font-awesome/css/font-awesome.css"],
  providers: [ PartnersService, LoginService ]
})
export class PartnersComponent implements OnInit {

  address: string;
  country: string;
  region: string;
  city: string;
  postalCode: number;
  phoneNumber: string;
  conditionsChecked: boolean;

  constructor(
    private loginService: LoginService,
    private partnersService: PartnersService,
    private appService: AppService,
    // private datePipe: DatePipe,
    private router: Router) { }

  ngOnInit() {
    this.address = "4 rue Gaston Baratte";
    this.country = "France";
    this.region = "Hauts-de-France";
    this.city = "Villeneuve d'Ascq";
    this.postalCode = 59000;
    this.phoneNumber = "0123456666";
    this.conditionsChecked = false;
    }
  
  onSubmit(event: any) {
    event.stopPropagation();
    if(! this.conditionsChecked ) {
      alert("Il faut accepter les conditions.");
    } else {
      
      console.info(this.address);
      console.info(this.country);
      console.info(this.region);
      console.info(this.city);
      console.info(this.postalCode);
      console.info(this.phoneNumber);
      console.info(this.conditionsChecked);
      let token = localStorage.getItem("token");
      console.info("token");
      console.info(token);
      this.partnersService.becomeGuide(this.address, this.country, this.region, 
        this.city, this.postalCode, this.phoneNumber, token)
        .then(res => {
          
          console.info("res");
          console.info(res);
          this.router.navigate(['profil']);
        });
    }
  }

}
