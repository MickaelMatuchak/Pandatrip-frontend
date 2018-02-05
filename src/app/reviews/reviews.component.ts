import {Component, OnInit, Input} from '@angular/core';
import {ReviewsModel} from './reviews.model';
import {isNull} from 'util';
import {ImageModel} from '../image/image.model';
import {
  OnClickEvent,
  OnRatingChangeEven,
  OnHoverRatingChangeEvent
} from './../../../node_modules/angular-star-rating/star-rating-struct';
import {AppService} from '../app.service';
import {UserModel} from '../profil/profil.model';
import {ReviewService} from "./review.service";
import {DatePipe} from "@angular/common";
import {ProfilService} from "../profil/profil.service";
import {VisitModel} from "../visit/visit.model";
import {VisitService} from "../visit/visit.service";


@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css', '../../../node_modules/bulma/css/bulma.css', './star-rating.scss'],
  providers: [DatePipe, ReviewService, ProfilService, AppService, VisitService]
})

export class ReviewsComponent implements OnInit {
  @Input('Reviews')
  reviews: ReviewsModel[];
  @Input('visit')
  visitSelected: VisitModel;
  noReviews: boolean = true;
  reviewNote: number = 3;
  reviewTitle: string = null;
  reviewMessage: string = null;

  constructor(private appService: AppService,
              private reviewService: ReviewService,
              private profilService: ProfilService,
              private visitService: VisitService,
              private datePipe: DatePipe) {
  }

  onClickResult: OnClickEvent;

  onClick = ($event: OnClickEvent) => {
    this.reviewNote = $event.rating;
    this.onClickResult = $event;
  };

  ngOnInit() {
    this.noReviews = (this.reviews.length === 0);

    if (!this.noReviews) {
      this.noReviews = false;

      let reviewsObj = this.reviews;
      this.reviews = new Array;

      for (let i = 0; i < reviewsObj.length; i++) {
        let user: any = reviewsObj[i].user;

        let image = this.appService.initialiseUserImage(user);
        user.image = image;

        this.reviews.push(new ReviewsModel(reviewsObj[i].id, reviewsObj[i].note, reviewsObj[i].title, reviewsObj[i].text, reviewsObj[i].date, user));
      }
    } else {
      this.noReviews = true;
    }
  }

  ajouterReview() {
    const token = this.appService.getLocalVar('token');

    if (token !== null && this.reviewMessage !== null && this.reviewTitle != null) {
      const tokenDecoded = this.appService.decodeToken();

      // Récupére l'utilisateur
      this.profilService.getUser(tokenDecoded.username)
        .then(data => {
          const user = data['hydra:member'][0];

          const date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss');
          //this.reviewTitle
          const review = new ReviewsModel(null, this.reviewNote, this.reviewTitle, this.reviewMessage, date, user);

          // Ajoute l'avis
          this.reviewService.postReview(review, token)
            .then(postReview => {
              let review = JSON.parse(postReview['_body']);
              let createdReview = new ReviewsModel(review.id, review.note, review.title, review.text, review.date, user);

              this.visitSelected.reviews.push(createdReview);

              // Associe l'avis à la visite
              this.visitService.addReview(this.visitSelected, token)
                .then(data => {
                  this.reviewTitle = null;
                  this.reviewMessage = null;
                  this.reviewNote = 3;

                  alert('Avis ajouté');
                });
            });
        });
    } else {
      alert('Une erreur est survenue, votre avis n\'a pas été ajouté');
    }
  }
}
