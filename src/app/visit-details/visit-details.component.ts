import { Component, OnInit } from '@angular/core';
import {VisitDetailsModel} from "./visit-details.model";

const VISITSDETAILS: VisitDetailsModel =
  { id: 1, name: 'Arc de Triomphe', address: '1 rue mock', city: 'Paris', postalCode: 93000, description: "L’arc de triomphe de l’Étoile souvent appelé simplement l'Arc de Triomphe, dont la construction, décidée par l'empereur Napoléon Ier, débuta en 1806 et s'acheva en 1836 sous Louis-Philippe, est situé à Paris, dans le 8e arrondissement. Il s'élève au centre de la place Charles-de-Gaulle (anciennement place de l’Étoile), dans l'axe et à l’extrémité ouest de l’avenue des Champs-Élysées, à 2,2 kilomètres de la place de la Concorde"};

@Component({
  selector: 'visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css', '../../../node_modules/bulma/css/bulma.css']
})
export class VisitDetailsComponent implements OnInit {

  visitDetails = VISITSDETAILS;
  constructor() {  }

  ngOnInit() {
  }

}
