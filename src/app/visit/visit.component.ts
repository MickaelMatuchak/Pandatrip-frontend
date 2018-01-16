import { Component, OnInit } from '@angular/core';
import { VisitModel } from './visit.model';

const VISITS: VisitModel[] = [
  { id: 1, name: 'Arc de Triomphe', address: '1 rue mock' },
  { id: 2, name: 'Tour Eiffel', address: '2 rue mock' },
  { id: 3, name: 'Jardin de Majorelle', address: '3 rue mock' },
  { id: 4, name: 'Château de Versailles', address: '4 rue mock' },
  { id: 5, name: 'Pont d Avignon', address: '5 rue mock' },
  { id: 6, name: 'Invalides', address: '6 rue mock' },
  { id: 7, name: 'Lieu 7', address: '7 rue mock' },
  { id: 8, name: 'Lieu 8', address: '8 rue mock' },
];

@Component({
  selector: 'visits',
  templateUrl: 'visit.component.html',
  styleUrls: ['visit.component.css', '../../../node_modules/bulma/css/bulma.css']
})

export class VisitComponent implements OnInit {
  lineVisits = [];

  separateLine = function (nbElementPerLine) {
    for (var i = 0; i < VISITS.length; i++) {
      if (i % nbElementPerLine == 0) {
        var array = new Array();
        this.lineVisits.push(array);
      }

      array.push(VISITS[i]);
    }
  }

  ngOnInit() {
    this.separateLine(4);
  }
}
