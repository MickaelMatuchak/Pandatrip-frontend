import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnersService } from './partners.service';
import { AppService } from '../app.service';
import { ProfilService } from '../profil/profil.service';
import { UserModel } from '../profil/profil.model';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css', '../../../node_modules/bulma/css/bulma.css', "../../../node_modules/font-awesome/css/font-awesome.css"],
  providers: [ PartnersService, ProfilService, LoginService ]
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
    private profilService: ProfilService,
    private partnersService: PartnersService,
    private appService: AppService,
    private loginService: LoginService,
    // private datePipe: DatePipe,
    private router: Router) { }

  ngOnInit() {
    this.address = "adresse";
    this.country = "pays";
    this.region = "région";
    this.city = "ville";
    this.postalCode = 59000;
    this.phoneNumber = "0123456789";
    this.conditionsChecked = false;
    }
  
  onSubmit(event: any) {
    event.stopPropagation();
    if(! this.conditionsChecked ) {
      alert("Il faut accepter les conditions.");
    } else {
      let token = localStorage.getItem("token");
      let tokenDecoded = this.appService.decodeToken();

      let userId = localStorage.getItem("idUser");
      this.partnersService.becomeGuide(this.address, this.country, this.region, 
        this.city, this.postalCode, this.phoneNumber, token, userId)
        .then(res => {
          this.appService.logOut();
          this.router.navigate(['login']);
          alert("Vous devez vous reconnecter pour voir votre changement de statut");
        });
    }
  }

}
