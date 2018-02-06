import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {VisitModel} from './visit.model';
import {VisitService} from './visit.service';
import {PositionService} from './position.service';

@Component({
  selector: 'visits',
  templateUrl: 'visit.component.html',
  styleUrls: ['visit.component.css', '../../../node_modules/bulma/css/bulma.css'],
  providers: [VisitService, PositionService]
})

export class VisitComponent implements OnInit {
  lineVisits = [];
  selectedVisitModel: VisitModel;
  location = {};
  ville = 'Lille';
  codePostal = 59;

  /*  setPosition(position){
   this.location = position.coords;
   console.log(position.coords);
   }*/

  constructor(private router: Router,
              private visitService: VisitService,
              private positionService: PositionService) {
  }

  separateLine = function (nbElementPerLine, visits) {
    let array = new Array();

    for (let i = 0; i < visits.length; i++) {

      if (i % nbElementPerLine === 0) {
        array = new Array();
        this.lineVisits.push(array);
      }

      array.push(
        new VisitModel(visits[i].id, visits[i].name, visits[i].images, visits[i]['reviews'], visits[i].latitude,
          visits[i].longitude, visits[i].adresse, visits[i].country, visits[i].region, visits[i].city, visits[i].postalCode,
          visits[i].description, visits[i].note, visits[i].nbNotes, visits[i].site)
      );
    }
  };

  readVisitsPromise() {
    this.visitService.getNumbersVisits(8, this.codePostal)
      .then((data: Object[]) => {
          this.separateLine(4, data['hydra:member']);
        }
      );
  }

  onSelect(visit: VisitModel, event: any) {
    event.stopPropagation();
    this.selectedVisitModel = visit;
    this.gotoDetail();
  }

  gotoDetail() {
    this.router.navigate(['/visit', this.selectedVisitModel.name]);
  }

  ngOnInit() {
    this.readVisitsPromise();

    this.getLieu();
  }

  getLieu() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;

        let lieu;

        this.positionService.getPosition(position.coords.latitude, position.coords.longitude).then(
          data => {
            if (data['results'][0] !== undefined) {
              lieu = data['results'][0];
              lieu = lieu['address_components'];

              lieu.forEach(function(element) {
                if (element['types'][0].match('postal_code')) {
                  this.codePostal = element['short_name'];
                  this.codePostal = parseInt(this.codePostal / 1000 + '', 10);
                } else if (element['types'][0].match('city')) {
                  this.ville = element['short_name'];
                }
              }, this);

              this.visitService.getNumbersVisits(8, this.codePostal)
                .then((data: Object[]) => {
                    this.lineVisits = [];
                    this.separateLine(4, data['hydra:member']);
                  }
                );
            }
          });
      });
    }
  }
}

@Component({
  selector: 'visits-suggestion',
  templateUrl: 'visit-suggestion.component.html',
  styleUrls: ['visit.component.css', '../../../node_modules/bulma/css/bulma.css'],
  providers: [VisitService]
})

export class VisitSuggestionComponent implements OnInit {
  visits: VisitModel[] = [];
  @Input('visitSelected')
  visitSelected: VisitModel;

  constructor(private visitService: VisitService, private router: Router) {
  }

  ngOnInit(): void {
    this.visitService.getNumbersVisits(4, parseInt(this.visitSelected.postalCode / 1000 + '', 10))
      .then((data: Object[]) => {
          const visits = data['hydra:member'];

          for (let i = 0; i < visits.length; i++) {
            if (visits[i].name !== this.visitSelected.name) {
              this.visits.push(new VisitModel(visits[i].id, visits[i].name, visits[i].images, null, null, null,
                visits[i].address, visits[i].country, visits[i].region, visits[i].city, visits[i].postalCode,
                visits[i].description, visits[i].note, null, null));
            }
          }

          if (this.visits.length === 4) {
            this.visits.pop();
          }

          if (this.visits.length < 3) {
            console.log("need autre visite");
          }
        }
      );
  }

  onSelect(visit, event) {
    this.router.navigate(['visit/' + visit.name]);
  }
}
