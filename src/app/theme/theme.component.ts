import { Component, OnInit } from '@angular/core';
import { ThemeModel } from './theme.model';
import { ThemeService } from './theme.service';
import { log } from 'util';

const THEMES: ThemeModel[] = [
    { id: 1, name: 'Parc'},
    { id: 2, name: 'Histoire'},
    { id: 3, name: 'Château'},
    { id: 4, name: 'Guerre'},
    { id: 5, name: 'Forêt'},
    { id: 6, name: 'Culte'},
    { id: 7, name: 'Musée'},
    { id: 8, name: 'Lac'}
];

@Component({
  selector: 'themes',
  templateUrl: 'theme.component.html',
  styleUrls: ['theme.component.css', '../../../node_modules/bulma/css/bulma.css'],
  providers: [ ThemeService ]
})

export class ThemeComponent implements OnInit{
  lineThemes = [];

  constructor(private themeService: ThemeService) {}

  separateLine = function(nbElementPerLine) {
    for (var i = 0; i < THEMES.length; i++) {
      if (i % nbElementPerLine == 0) {
        var array = new Array();
        this.lineThemes.push(array);
      }

      array.push(THEMES[i]);
    }
    log("TEST Observable : ");
    log(this.themeService.getThemes());
    log("TEST Promise : ");
    log(this.themeService.getThemes());
    log("TEST Promise id-1 : ");
    log(this.themeService.getTheme());
  }

  ngOnInit() {
    this.separateLine(4);
  }
}
