import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {isNull} from 'util';
import {ThemeService} from '../theme/theme.service';
import {ThemeModel} from '../theme/theme.model';
import {VisitModel} from '../visit/visit.model';
import {ImageModel} from '../image/image.model';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css', '../../../node_modules/bulma/css/bulma.css'],
  providers: [ThemeService]
})

export class ThemeDetailComponent implements OnInit, OnDestroy {

  lineVisits = [];
  themeSelected: ThemeModel;
  selectedVisitModel: VisitModel;

  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private themeService: ThemeService) {
  }

  separateLine = function (nbElementPerLine, visits) {
    let array = new Array();

    for (let i = 0; i < visits.length; i++) {

      if (i % nbElementPerLine === 0) {
        array = new Array();
        this.lineVisits.push(array);
      }

      array.push(visits[i]);
    }
  };

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const nameTheme: any = params['name'];

      this.themeSelected = new ThemeModel(null, '', new ImageModel(null, '', ''),
        [new VisitModel(null, '', [new ImageModel(null, '', '')], null, 0, 0, '', '', '', '', null, '', 0, 0, '')]
      );

      if (!isNull(nameTheme)) {
        this.themeService.getTheme(nameTheme)
          .then(theme => {
            const themeTmp = theme['hydra:member'][0];

            const arrayVisits: VisitModel[] = new Array();
            let arrayImages: ImageModel[] = new Array();
            const visits = themeTmp['visits'];

            for (let i = 0; i < visits.length; i++) {

              arrayImages = new Array();
              const visit = visits[i];
              const images = visit['images'];

              for (let j = 0; j < images.length; j++) {
                arrayImages.push(new ImageModel(images[j].id, images[j].url, images[j].description));
              }

              arrayVisits.push(
                new VisitModel(visit.id, visit.name, arrayImages, visit['reviews'], visit.latitude, visit.longitude,
                  visit.adresse, visit.country, visit.region, visit.city, visit.postalCode, visit.description,
                  visit.note, visit.nbNotes, visit.site)
              );
            }

            this.themeSelected = new ThemeModel(themeTmp['id'], themeTmp['name'], themeTmp['image'], arrayVisits);
            this.separateLine(5, this.themeSelected.visits);
          });
      }
    });
  }

  onSelect(visit: VisitModel, event: any) {
    event.stopPropagation();
    this.selectedVisitModel = visit;
    this.gotoDetail();
  }

  gotoDetail() {
    this.router.navigate(['/visit', this.selectedVisitModel.name]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
