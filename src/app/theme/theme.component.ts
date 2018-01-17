import { Component, OnInit } from '@angular/core';
import { ThemeModel } from './theme.model';
import { ThemeService } from './theme.service';
import { log } from 'util';

const THEMES: ThemeModel[] = [
  { id: 1, name: 'Parc animalier', image: {url: 'parc-animalier.jpg'}},
  { id: 2, name: 'Histoire', image: {url: 'histoire.jpg'}},
  { id: 3, name: 'Château', image: {url: 'chateau.jpg'}},
  { id: 4, name: 'Guerre', image: {url: 'guerre.jpg'}},
  { id: 5, name: 'Culte', image: {url: 'culte.jpg'}},
  { id: 6, name: 'Musée', image: {url: 'musee.jpg'}},
  { id: 7, name: 'Lac', image: {url: 'lac.jpg'}},
  { id: 8, name: 'Forêt', image: {url: 'foret.jpg'}}
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
