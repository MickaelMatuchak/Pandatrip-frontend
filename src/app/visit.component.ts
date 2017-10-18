import { Component } from '@angular/core';
import { VisitModel } from './visit.model';

const VISITS: VisitModel[] = [
  { id: 1, name: 'Arc de triomphe', address: '1 rue mock' },
  { id: 2, name: 'Tour Eiffel', address: '2 rue mock' },
  { id: 3, name: 'Jardin de Majorel', address: '3 rue mock' },
  { id: 4, name: 'Château de Versailles', address: '4 rue mock' },
  { id: 5, name: 'Pont d Avignon', address: '5 rue mock' },
  { id: 6, name: 'Invalides', address: '6 rue mock' },
  { id: 7, name: 'Lieu 7', address: '7 rue mock' },
  { id: 8, name: 'Lieu 8', address: '8 rue mock' },
  { id: 9, name: 'Lieu 9', address: '9 rue mock' },
  { id: 10, name: 'Lieu 10', address: '10 rue mock' }
];

@Component({
  selector: 'visits',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})

export class VisitComponent {
  visits = VISITS;
}
