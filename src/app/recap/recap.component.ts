import { Component, OnInit } from '@angular/core';
import { RecapModel } from "./recap.model";

const RECAP: RecapModel[] = [
  { id: 1, image: 'Arc de Triomphe.jpg', nom: 'Arc de Triomphe', date: '22/01/2018 à 14:00', guide: 'Chloé', guide_image: 'girl.png'},
  { id: 2, image: 'Tour Eiffel.jpg', nom: 'Tour Eiffel', date: '22/01/2018 à 15:00', guide: null, guide_image: null},
];


@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css', '../../../node_modules/bulma/css/bulma.css']
})
export class RecapComponent implements OnInit {

  recap = RECAP;

  constructor() { }

  ngOnInit() {
  }

}
