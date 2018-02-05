import {Component, OnInit} from '@angular/core';
import {GuideModel} from './guide.model';
import {GuideService} from './guide.service';
import {ReviewsModel} from '../reviews/reviews.model';
import {VisitGuideModel, UserModel} from '../profil/profil.model';
import {ImageModel} from '../image/image.model';
import {AppService} from '../app.service';

@Component({
  selector: 'guides',
  templateUrl: 'guide.component.html',
  styleUrls: ['guide.component.css', '../../../node_modules/bulma/css/bulma.css', '../reviews/star-rating.scss'],
  providers: [GuideService, AppService]
})

export class GuideComponent implements OnInit {

  constructor(private guideService: GuideService,
              private appService: AppService) {
  }

  guides: GuideModel[];

  detail() {
    this.guideService.getNumbersGuides(3)
      .then(data => {
        const guides = data['hydra:member'];

        for (let i = 0; i < guides.length; i++) {
          const guide = guides[i];

          const arrayReviews: ReviewsModel[] = new Array();
          for (let j = 0; j < guide.reviews.length; j++) {
            /* TODO */
          }

          const arrayVisits: VisitGuideModel[] = new Array();
          for (let j = 0; j < guide.listVisits.length; j++) {
            /* TODO */
          }

          this.guides.push(new GuideModel(guide.id, guide.billfold,
            arrayReviews, guide.user, guide.address, guide.country,
            guide.region, guide.city, guide.postalCode, guide.phoneNumber,
            arrayVisits));
        }
      });
  }

  ngOnInit() {
    this.guides = [];
    const nbGuideAccueil = 3;

    for (let i = 0; i < nbGuideAccueil; i++) {
      const user = new UserModel(null, '', '', '', '', '', new ImageModel(null, '', ''));

      this.guides.push(new GuideModel(null, null, null, user, '', '', '', '', null, '', null));
    }

    this.guideService.getNumbersGuides(nbGuideAccueil)
      .then(data => {
        this.guides = [];
        const guidesSelect = data['hydra:member'];
        let guide;
        let nbNotes;

        for (let i = 0; i < guidesSelect.length; i++) {
          guide = guidesSelect[i];
          const arrayReviews: ReviewsModel[] = new Array();

          for (let j = 0; j < guide.reviews.length; j++) {
            arrayReviews.push(new ReviewsModel(guide.reviews[j].id, guide.reviews[j].note, null, null, null, null));
          }

          nbNotes = guide.reviews.length;

          const userRecup: UserModel = guide.user;

          const image = this.appService.initialiseUserImage(userRecup);

          const user = new UserModel(userRecup.id, userRecup.username, userRecup.gender,
            userRecup.firstname, userRecup.lastname, '', image);

          this.guides.push(new GuideModel(guide.id, null, arrayReviews, user, '', '', '', '', null, '', null));

          this.calculMoyenne();
        }
      });
  }

  calculMoyenne() {
    for (let i = 0; i < this.guides.length; i++) {
      let somme = 0;

      if (this.guides[i].reviews.length !== 0) {
        this.guides[i].reviews.forEach(function (element) {
          somme += element.note;
        });

        somme /= this.guides[i].reviews.length;
      } else {
        somme = 2.5;
      }

      this.guides[i].note = somme;
    }
  }
}
