import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {isNull} from 'util';
import {VisitService} from '../visit/visit.service';
import {VisitModel} from '../visit/visit.model';
import {ImageModel} from '../image/image.model';
import {ReviewsModel} from '../reviews/reviews.model';

import {ICarouselConfig, AnimationConfig} from 'angular4-carousel';

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css', '../../../node_modules/bulma/css/bulma.css', '../../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [VisitService]
})
export class VisitDetailsComponent implements OnInit {
  lineVisits = [];
  visitSelected: VisitModel;
  public imageSources: string[] = [];
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private visitService: VisitService
  ) {}

  private getVisitDetails(nameVisit: string) {
    this.visitService.getVisit(nameVisit)
      .then(visit => {
        let visitTmp = visit["hydra:member"][0];
        let arrayImages: ImageModel[] = new Array();
        let arrayReviews: ReviewsModel[] = new Array();
        let i: number = 0;

        let images = visitTmp["images"];
        for (i = 0; i < images.length; i++) {
          arrayImages.push(new ImageModel(images[i].id, images[i].url, images[i].description));
          this.imageSources.push('./assets/img/' + images[i].url);
        }

        let reviews = visitTmp["reviews"];
        for (i = 0; i < reviews.length; i++) {
          arrayReviews.push(new ReviewsModel(reviews[i].id, reviews[i].note, reviews[i].title, reviews[i].text, reviews[i].date, reviews[i].user));
        }

        this.visitSelected = new VisitModel(visitTmp["id"], visitTmp["name"],
          arrayImages,
          arrayReviews,
          visitTmp["latitude"], visitTmp["longitude"], visitTmp["address"],
          visitTmp["country"], visitTmp["region"], visitTmp["city"],
          visitTmp["postalCode"], visitTmp["description"], visitTmp["note"],
          visitTmp["nbNotes"], visitTmp["site"]);
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let nameVisit: any = params['name'];
      this.visitSelected = new VisitModel(null, '', [new ImageModel(null, '', '')], null, 0, 0, 'addresse', 'country', 'region', 'city', null, '', 0, 0, '');

      if (!isNull(nameVisit)) {
        this.getVisitDetails(nameVisit);
      }
    });

    $('.open-modal').click(this.toggleModalClasses);
    $('.close-modal').click(this.toggleModalClasses);

    $('tr').on('click', function () {
      $('tr').removeClass('selected');
      $(this).addClass('selected');
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 4000,
    stopAutoplayMinWidth: 768
  };

  /* afficher pop-up*/
  toggleModalClasses(event) {
    let modalId = event.currentTarget.dataset.modalId;
    let modal = $(modalId);
    modal.toggleClass('is-active');
    $('html').toggleClass('is-clipped');
  };
}
