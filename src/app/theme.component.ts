import { Component } from '@angular/core';
import { ThemeModel } from './theme.model';

const THEMES: ThemeModel[] = [
  { id: 1, name: 'Histoire'},
  { id: 2, name: 'Culture'},
  { id: 3, name: 'Château'},
  { id: 4, name: 'Guerre'},
  { id: 5, name: 'Ruines'},
  { id: 6, name: 'Culte'},
  { id: 7, name: 'Musée'},
  { id: 8, name: 'Lac'},
  { id: 9, name: 'Forêt'},
  { id: 10, name: 'Parc'}
];

@Component({
  selector: 'themes',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})

export class ThemeComponent {
  themes = THEMES;
}
