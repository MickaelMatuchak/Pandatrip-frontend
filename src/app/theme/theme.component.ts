import { Component, OnInit } from '@angular/core';
import { ThemeModel } from './theme.model';
import { ThemeService } from './theme.service';
import { log } from 'util';


@Component({
  selector: 'themes',
  templateUrl: 'theme.component.html',
  styleUrls: ['theme.component.css', '../../../node_modules/bulma/css/bulma.css'],
  providers: [ ThemeService ]
})

export class ThemeComponent implements OnInit{
  lineThemes = [];

  constructor(private themeService: ThemeService) {}

  separateLine = function(nbElementPerLine, themes) {
    for (var i = 0; i < themes.length; i++) {
      if (i % nbElementPerLine == 0) {
        var array = new Array();
        this.lineThemes.push(array);
      }
      array.push(themes[i]);
    }
  }

  readThemesPromise() {
    this.themeService.getThemesPromise().then(
      (data: ThemeModel[]) => {
        this.separateLine(4, data["hydra:member"]);
      }
    );
  }
  

  ngOnInit() {
    this.readThemesPromise();
  }
}
