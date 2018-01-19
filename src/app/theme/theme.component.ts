import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  selectedThemeModel: ThemeModel;
  strToRetireToHaveId: string;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

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

  onSelect(theme: ThemeModel, event: any) { 
    event.stopPropagation();
    this.selectedThemeModel = theme;
    this.gotoDetail();
  }

  gotoDetail() {
    let id = this.selectedThemeModel["@id"].substr(this.strToRetireToHaveId.length);
    this.router.navigate(
      ['/theme', { 
                  idTheme: id,
                  nameTheme: this.selectedThemeModel.name }]
    );
  }

  ngOnInit() {
    this.strToRetireToHaveId = "/api/themes/";
    this.readThemesPromise();
  }
}
