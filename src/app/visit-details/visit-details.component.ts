import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {isNull} from 'util';
import {VisitService} from '../visit/visit.service';
import {VisitModel} from '../visit/visit.model';
import {ImageModel} from '../image/image.model';
import {ReviewsModel} from '../reviews/reviews.model';

import {ICarouselConfig, AnimationConfig} from 'angular4-carousel';
import {ItemVisitModel} from "./item-visit.model";
import {GuideVisitService} from "./guide-visit.service";
import {VisitGuideModel} from "../profil/profil.model";
import {GuideModel} from "../guide/guide.model";

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css', '../../../node_modules/bulma/css/bulma.css', '../../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [VisitService, GuideVisitService]
})
export class VisitDetailsComponent implements OnInit {
  lineVisits = [];
  visitSelected: VisitModel;
  noReviews: boolean = false;
  public imageSources: string[] = [];
  private sub: any;
  itemsVisitGuide: VisitGuideModel[] = new Array();
  itemsVisit: ItemVisitModel[] = new Array();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private visitService: VisitService,
              private guidevisit: GuideVisitService) {
  }

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
        this.noReviews = false;

        this.visitSelected = new VisitModel(visitTmp["id"], visitTmp["name"],
          arrayImages,
          arrayReviews,
          visitTmp["latitude"], visitTmp["longitude"], visitTmp["address"],
          visitTmp["country"], visitTmp["region"], visitTmp["city"],
          visitTmp["postalCode"], visitTmp["description"], visitTmp["note"],
          visitTmp["nbNotes"], visitTmp["site"]);

        this.guidevisit.getGuidesByVisit(visitTmp["id"])
          .then(guideVisit => {

            let visitGuides = guideVisit["hydra:member"];

            for (i = 0; i < visitGuides.length; i++) {
              let guide = visitGuides[i].guide;
              let image: ImageModel;

              if (guide.user.image) {
                image = new ImageModel(guide.user.image.id, guide.user.image.url, guide.user.image.description);
              } else {
                if (guide.user.gender == 'male') {
                  image = new ImageModel(null, "boy.png", "boy");
                } else {
                  image = new ImageModel(null, "girl.png", "girl");
                }
              }

              guide.user.image = image;
              this.itemsVisitGuide.push(new VisitGuideModel(visitGuides[i].id, null, guide, visitGuides[i].date, visitGuides[i].duration, visitGuides[i].price, true));
            }
          });
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let nameVisit: any = params['name'];
      this.visitSelected = new VisitModel(null, '', [new ImageModel(null, '', '')], null, 0, 0, 'addresse', 'country', 'region', 'city', null, '', 0, 0, '');
      this.noReviews = true;

      if (!isNull(nameVisit)) {
        this.getVisitDetails(nameVisit);
      }
    });

    $('.open-modal').click(this.toggleModalClasses);
    $('.close-modal').click(this.toggleModalClasses);

    if (localStorage.getItem('visits') != null) {
      this.itemsVisit = JSON.parse(localStorage.getItem('visits'));
    }
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
  }

  selectedTR(event) {
    $('tr').removeClass('selected');
    event.currentTarget.setAttribute('class', 'selected');
  }

  stockerEnSession(itemVisit: ItemVisitModel) {

    // Sauvegarder les informations dans l'espace local courant

    if (this.itemsVisit != null) {
      let isExist = false;

      this.itemsVisit.forEach(function (element) {
        if (element.visit.name == itemVisit.visit.name) {
          isExist = true;
        }
      });

      if (isExist == false) {
        this.itemsVisit.push(itemVisit);
      }
    } else {
      this.itemsVisit = [itemVisit];
    }

    localStorage.setItem("visits", JSON.stringify(this.itemsVisit));
  }

  ajouterPanier() {
    let visit = new ItemVisitModel(this.visitSelected, null);

    this.stockerEnSession(visit);
  }

  ajouterPanierGuide() {
    let trSelected = document.getElementsByClassName("selected")[0];
    let indexGuide = trSelected.getElementsByTagName('td')[0].getAttribute('class');

    if (trSelected != undefined) {
      let visit = new ItemVisitModel(this.visitSelected, this.itemsVisitGuide[indexGuide]);

      this.stockerEnSession(visit);
    }
  }

  supprimerItemPanier(itemVisitName) {
    let indexToDelete = null;

    this.itemsVisit.forEach(function(element, index) {
      if (element.visit.name == itemVisitName) {
        indexToDelete = index;
      }
    });

    this.itemsVisit.splice(indexToDelete, 1);
    localStorage.setItem("visits", JSON.stringify(this.itemsVisit));
  }
}
