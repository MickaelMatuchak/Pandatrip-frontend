import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { isNull, log } from 'util';
import { ThemeService } from '../theme/theme.service';
import { ThemeModel } from '../theme/theme.model';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css'],
  providers: [ ThemeService ]
})
export class ThemeDetailComponent implements OnInit, OnDestroy {
  
  lineThemes = [];
  themeId: number;
  themeName: string;
  themeSelected: ThemeModel;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService) {
    }

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
    // this.themeService.getThemesPromise().then(
    //   (data: ThemeModel[]) => {
    //     this.separateLine(4, data["hydra:member"]);
    //   }
    // );
  }
  

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.themeName = params['nameTheme'];
      let idTheme :number = params['idTheme'];
      console.info('idTheme: ' + idTheme);
      if (!isNaN(idTheme)) {
        let id = +idTheme;
        console.info("this.themeSelected avant " + this.themeSelected);
        this.themeService.getTheme(id)
                    .then(theme => {
                      this.themeSelected = new ThemeModel(theme["@id"], theme["name"]);        
                      console.info("this.themeSelected apres " + this.themeSelected);
                    });
      } else { 
        
      }
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
