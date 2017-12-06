import { Component } from '@angular/core';
import { GuideModel } from './guide.model';

const GUIDES: GuideModel[] = [
  { id: 1, name: 'Jean', image: 'chemin/vers/photo/jean.png', note: 4},
  { id: 2, name: 'Huguette', image: 'chemin/vers/photo/huguette.png', note: 3.5},
  { id: 3, name: 'Xin Xao', image: 'chemin/vers/photo/xin-xao.png', note: 4},
  { id: 4, name: 'Claire', image: 'chemin/vers/photo/claire.png', note: 4.5},
  { id: 5, name: 'Paul', image: 'chemin/vers/photo/paul.png', note: 5}
];

@Component({
  selector: 'guides',
  templateUrl: 'guide.component.html',
  styleUrls: ['guide.component.css', '../../../node_modules/bulma/css/bulma.css']
})

export class GuideComponent {
  guides = GUIDES;
}
