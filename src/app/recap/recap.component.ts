import {Component, OnInit} from '@angular/core';
import {ItemVisitModel} from '../visit-details/item-visit.model';
import {ProfilService} from '../profil/profil.service';
import {AppService} from '../app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css', '../../../node_modules/bulma/css/bulma.css', '../../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [ ProfilService, AppService ]
})
export class RecapComponent implements OnInit {
  title: string;
  public show: boolean = false;
  public buttonName: any = 'Show';
  itemsVisit: ItemVisitModel[];

  constructor(private profilService: ProfilService, private appService: AppService, private router: Router) {
    this.title = 'Parcours Sans Nom';
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (!this.show) {
      this.buttonName = 'Show';
    } else {
      this.buttonName = 'Hide';
    }
  }

  ngOnInit() {
    if (localStorage.getItem('visits') !== undefined) {
      this.itemsVisit = JSON.parse(localStorage.getItem('visits'));
    }
  }

  onSubmit(event: any) {
    event.stopPropagation();

    const token = localStorage.getItem('token');

    if (token !== null) {
      const tokenDecoded = this.appService.decodeToken();

      // Récupère l'USER
      this.profilService.getUser(tokenDecoded.username)
        .then(user => {
          const idUser = user['hydra:member'][0].id;

          // Créer un PARCOURS
          this.profilService.postUserParcours(this.title, idUser, token)
            .then(parcours => {

              // Pour chaque visite séléctionnée par l'utilisateur
              this.itemsVisit.forEach(function (element, index) {
              let createdParcours = JSON.parse(parcours['_body']);

                element.parcours = '/api/parcours/' + createdParcours.id;
                element.user = '/api/users/' + idUser;
                element.isValidated = false;

                // Créer une VISITUSER associée au PARCOURS
                this.profilService.postUserVisit(element, token)
                  .then(visitUser => {
                    if (index + 1 === this.itemsVisit.length) {
                      localStorage.removeItem('visits');
                      alert('Parcours enregistré');
                      this.router.navigate(['profil']);
                    }
                  });
              }, this);

            });
        });
    } else {
      alert('Vous devez être connecté pour enregistrer un parcours');
    }
  }
}
