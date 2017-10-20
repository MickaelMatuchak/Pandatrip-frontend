import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./theme.component.css', '../../node_modules/bulma/css/bulma.css']
})

export class ThemeComponent implements OnInit{
  lineThemes = [];

  separateLine = function(nbElementPerLine) {
    for (var i = 0; i < THEMES.length; i++) {
      if (i % nbElementPerLine == 0) {
        var array = new Array();
        this.lineThemes.push(array);        
      }

      array.push(THEMES[i]);
    }
  }

  ngOnInit() {
    this.separateLine(5);
  }
}
