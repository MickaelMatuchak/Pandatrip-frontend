import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { isNull } from 'util';
import { ThemeService } from '../theme/theme.service';
import { ThemeModel } from '../theme/theme.model';
import { VisitModel } from '../visit/visit.model';
import { ImageModel } from '../image/image.model';
import { ReviewsModel } from '../reviews/reviews.model';

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
      let nameTheme :any = params['name'];
      this.themeSelected = new ThemeModel(null, "", new ImageModel(null, "", ""), [new VisitModel(null,"", [ new ImageModel(null, "", "") ], null, 0, 0, "", "", "", "", null, "", 0, 0, "")]);
      if (!isNull(nameTheme)) {
        this.themeService.getTheme(nameTheme)
        .then(theme => {
          let themeTmp = theme["hydra:member"][0];
          var i:number = 0;
          var j:number = 0;
          let arrayVisits: VisitModel[] = new Array();
          let arrayImages: ImageModel[] = new Array();
          let visits = themeTmp["visits"];

          for(i = 0; i < visits.length; i++) {
            arrayImages = new Array();
            let visit = visits[i];
            let images = visit["images"];
            for(j = 0; j < images.length; j++) {
              arrayImages.push( new ImageModel( images[j].id, images[j].url, images[j].description) );
            }
            arrayVisits.push( new VisitModel(visit.id, visit.name, arrayImages, visit["reviews"], visit.latitude, visit.longitude, visit.adresse, visit.country, visit.region, visit.city, visit.postalCode, visit.description, visit.note, visit.nbNotes, visit.site) );
          }
          
          this.themeSelected = new ThemeModel(themeTmp["id"], themeTmp["name"], themeTmp["image"], arrayVisits);
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
