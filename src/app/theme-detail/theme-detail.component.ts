import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { isNull } from 'util';
import { ThemeService } from '../theme/theme.service';
import { ThemeModel } from '../theme/theme.model';
import { VisitModel } from '../visit/visit.model';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css', '../../../node_modules/bulma/css/bulma.css'],
  providers: [ ThemeService ]
})
export class ThemeDetailComponent implements OnInit, OnDestroy {
  
  lineVisits = [];
  themeSelected: ThemeModel;
  selectedVisitModel: VisitModel;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService) {
    }

  separateLine = function(nbElementPerLine, visits) {
    for (var i = 0; i < visits.length; i++) {
      if (i % nbElementPerLine == 0) {
        var array = new Array();
        this.lineVisits.push(array);
      }
      array.push(visits[i]);
    }
  }  

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let nameTheme :any = params['name']
      if (!isNull(nameTheme)) {
        this.themeService.getTheme(nameTheme)
        .then(theme => {
          let themeTmp = theme["hydra:member"][0];
          this.themeSelected = new ThemeModel(themeTmp["id"], themeTmp["name"], themeTmp["image"], themeTmp["visits"]);
          this.separateLine(5, this.themeSelected.visits);
        });
      } else { 

      }
    });
  }
  
  onSelect(visit: VisitModel, event: any) { 
    event.stopPropagation();
    this.selectedVisitModel = visit;
    this.gotoDetail();
  }

  gotoDetail() {
    this.router.navigate(
      ['/visit', this.selectedVisitModel.name ]
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
