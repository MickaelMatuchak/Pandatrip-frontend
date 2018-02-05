import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {VisitModel, VisitModel2} from './visit.model';
import {VisitService} from './visit.service';

const VISITS: VisitModel2[] = [
  {id: 1, name: 'Arc de Triomphe', address: '1 rue mock'},
  {id: 2, name: 'Tour Eiffel', address: '2 rue mock'},
  {id: 3, name: 'Jardin de Majorelle', address: '3 rue mock'},
  {id: 4, name: 'Château de Versailles', address: '4 rue mock'},
  {id: 5, name: 'Pont d Avignon', address: '5 rue mock'},
  {id: 6, name: 'Invalides', address: '6 rue mock'},
  {id: 7, name: 'Lieu 7', address: '7 rue mock'},
  {id: 8, name: 'Lieu 8', address: '8 rue mock'},
];

@Component({
  selector: 'visits',
  templateUrl: 'visit.component.html',
  styleUrls: ['visit.component.css', '../../../node_modules/bulma/css/bulma.css'],
  providers: [VisitService]
})

export class VisitComponent implements OnInit {
  lineVisits = [];
  selectedVisitModel: VisitModel;

  constructor(private router: Router,
              private visitService: VisitService) {
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
    this.visitService.getNumbersVisits(8)
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
  }
}

@Component({
  selector: 'visits-suggestion',
  templateUrl: 'visit-suggestion.component.html',
  styleUrls: ['visit.component.css', '../../../node_modules/bulma/css/bulma.css']
})

export class VisitSuggestionComponent implements OnInit {
  lineVisits = [];

  separateLine = function (nbElementPerLine) {
    let array = new Array();

    for (let i = 0; i < 3; i++) {

      if (i % nbElementPerLine === 0) {
        array = new Array();
        this.lineVisits.push(array);
      }

      array.push(VISITS[i]);
    }
  };

  ngOnInit() {
    this.separateLine(1);
  }
}
