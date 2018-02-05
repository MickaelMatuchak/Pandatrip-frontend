import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PartnersService} from './partners.service';
import {AppService} from '../app.service';
import {ProfilService} from '../profil/profil.service';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css', '../../../node_modules/bulma/css/bulma.css', '../../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [PartnersService, ProfilService, LoginService]
})

export class PartnersComponent implements OnInit {

  address: string;
  country: string;
  region: string;
  city: string;
  postalCode: number;
  phoneNumber: string;
  conditionsChecked: boolean;

  constructor(private profilService: ProfilService,
              private partnersService: PartnersService,
              private appService: AppService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.country = 'France';
    this.conditionsChecked = false;
  }

  onSubmit(event: any) {
    event.stopPropagation();
    if (!this.conditionsChecked) {
      alert('Il faut accepter les conditions.');
    } else {
      const token = this.appService.getLocalVar('token');
      const userId = localStorage.getItem('idUser');

      this.partnersService.becomeGuide(this.address, this.country, this.region,
        this.city, parseInt(this.postalCode + '', 10), this.phoneNumber, token, userId)
        .then(res => {
          this.appService.logOut();
          this.router.navigate(['login']);
          alert('Vous devez vous reconnecter pour voir votre changement de statut');
        });
    }
  }
}
