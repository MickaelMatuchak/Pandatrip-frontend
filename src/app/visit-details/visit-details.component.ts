import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {isNull} from 'util';
import {VisitService} from '../visit/visit.service';
import {VisitModel} from '../visit/visit.model';
import {ImageModel} from '../image/image.model';
import {ReviewsModel} from '../reviews/reviews.model';
import {ICarouselConfig, AnimationConfig} from 'angular4-carousel';
import {ItemVisitModel} from './item-visit.model';
import {VisitGuideModel} from '../profil/profil.model';
import {AppService} from '../app.service';
import {GuideService} from '../guide/guide.service';
import {GuideVisitService} from './guide-visit.service';
import {DatePipe} from '@angular/common';
import {GuideModel} from "../guide/guide.model";

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css', '../../../node_modules/bulma/css/bulma.css', '../../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [VisitService, GuideVisitService, GuideService, DatePipe]
})

export class VisitDetailsComponent implements OnInit {
  lineVisits = [];
  visitSelected: VisitModel;
  noReviews: boolean = false;
  public imageSources: string[] = [];
  private sub: any;
  itemsVisitGuide: VisitGuideModel[] = new Array();
  itemsVisit: ItemVisitModel[] = new Array();
  price: null;
  duration: null;
  isGuide: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private visitService: VisitService,
              private guideVisit: GuideVisitService,
              private appService: AppService,
              private guideService: GuideService,
              private datePipe: DatePipe) {
  }

  private getVisitDetails(nameVisit: string) {
    this.imageSources = [];
    this.itemsVisitGuide = [];
    this.visitService.getVisit(nameVisit)
      .then(visit => {
        const visitTmp = visit['hydra:member'][0];
        const arrayImages: ImageModel[] = new Array();
        const arrayReviews: ReviewsModel[] = new Array();

        const images = visitTmp['images'];

        for (let i = 0; i < images.length; i++) {
          arrayImages.push(new ImageModel(images[i].id, images[i].url, images[i].description));
          this.imageSources.push('./assets/img/' + images[i].url);
        }

        const reviews = visitTmp['reviews'];

        for (let i = 0; i < reviews.length; i++) {
          arrayReviews.push(
            new ReviewsModel(reviews[i].id, reviews[i].note, reviews[i].title, reviews[i].text, reviews[i].date, reviews[i].user)
          );
        }

        this.noReviews = false;

        this.visitSelected = new VisitModel(visitTmp['id'], visitTmp['name'],
          arrayImages,
          arrayReviews,
          visitTmp['latitude'], visitTmp['longitude'], visitTmp['address'],
          visitTmp['country'], visitTmp['region'], visitTmp['city'],
          visitTmp['postalCode'], visitTmp['description'], visitTmp['note'],
          visitTmp['nbNotes'], visitTmp['site']);

        this.guideVisit.getGuidesByVisit(visitTmp['id'])
          .then(guideVisit => {

            const visitGuides = guideVisit['hydra:member'];

            for (let i = 0; i < visitGuides.length; i++) {
              const guide = visitGuides[i].guide;

              guide.user.image = this.appService.initialiseUserImage(guide.user);

              this.itemsVisitGuide.push(
                new VisitGuideModel(visitGuides[i].id, null, guide, visitGuides[i].date,
                  visitGuides[i].duration, visitGuides[i].price, true)
              );
            }
          });
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const nameVisit: any = params['name'];

      this.visitSelected = new VisitModel(null, '', [new ImageModel(null, '', '')], null, 0, 0, 'addresse', 'country',
        'region', 'city', null, '', 0, 0, '');

      this.noReviews = true;

      if (!isNull(nameVisit)) {
        this.getVisitDetails(nameVisit);
      }
    });

    $('.open-modal').click(this.toggleModalClasses);
    $('.close-modal').click(this.toggleModalClasses);

    const visits = localStorage.getItem('visits');
    if (visits != null) {
      this.itemsVisit = JSON.parse(localStorage.getItem('visits'));
    }

    const token = this.appService.getLocalVar('token');
    if (token != null) {
      this.isGuide = this.appService.initialiseIsGuide(this.appService.decodeToken().roles);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  config: ICarouselConfig = {
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
    const modalId = event.currentTarget.dataset.modalId;
    const modal = $(modalId);
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
        if (element.visit.name === itemVisit.visit.name) {
          isExist = true;
        }
      });

      if (isExist === false) {
        this.itemsVisit.push(itemVisit);
      }
    } else {
      this.itemsVisit = [itemVisit];
    }

    localStorage.setItem('visits', JSON.stringify(this.itemsVisit));
  }

  ajouterPanier() {
    const visit = new ItemVisitModel(this.visitSelected, null);

    this.stockerEnSession(visit);
  }

  ajouterPanierGuide() {
    const trSelected = document.getElementsByClassName('selected')[0];
    const indexGuide = trSelected.getElementsByTagName('td')[0].getAttribute('class');

    if (trSelected !== undefined) {
      const visit = new ItemVisitModel(this.visitSelected, this.itemsVisitGuide[indexGuide]);

      this.stockerEnSession(visit);
    }
  }

  supprimerItemPanier(itemVisitName) {
    let indexToDelete = null;

    this.itemsVisit.forEach(function (element, index) {
      if (element.visit.name === itemVisitName) {
        indexToDelete = index;
      }
    });

    this.itemsVisit.splice(indexToDelete, 1);
    localStorage.setItem('visits', JSON.stringify(this.itemsVisit));
  }

  enregistrerGuide() {
    if (this.isGuide && this.duration != null && this.price != null) {
      const token = this.appService.getLocalVar('token');
      const tokenDecoded = this.appService.decodeToken();

      this.guideService.getGuide(tokenDecoded.username)
        .then(guide => {

          const date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss');

          const userGuide: GuideModel = guide['hydra:member'][0];

          userGuide.user.image = this.appService.initialiseUserImage(userGuide.user);

          const visitGuide = new VisitGuideModel(null, this.visitSelected, userGuide, date,
            parseInt(this.duration, 10), parseInt(this.price, 10), true);

          this.guideVisit.postGuideVisit(visitGuide, token)
            .then(guideVisit => {
              const postVisitGuide = JSON.parse(guideVisit['_body']);

              visitGuide.id = postVisitGuide.id;

              this.itemsVisitGuide.push(visitGuide);
              alert('Vous êtes disponible en tant que guide sur cette visite');
            });
        });
    }
  }
}
