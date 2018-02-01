import {Component, OnInit, Input} from '@angular/core';
import {ReviewsModel} from './reviews.model';
import {isNull} from 'util';
import {ImageModel} from '../image/image.model';
import {
  OnClickEvent,
  OnRatingChangeEven,
  OnHoverRatingChangeEvent
} from './../../../node_modules/angular-star-rating/star-rating-struct';
import { AppService } from '../app.service';
import { UserModel } from '../profil/profil.model';


@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css', '../../../node_modules/bulma/css/bulma.css', './star-rating.scss']
})
export class ReviewsComponent implements OnInit {

  @Input('Reviews')
  reviews: ReviewsModel[];
  noReviews: boolean = true;

  constructor(
    private appService: AppService) {
  }

  onClickResult: OnClickEvent;
  onHoverRatingChangeResult: OnHoverRatingChangeEvent;
  onRatingChangeResult: OnRatingChangeEven;

  onClick = ($event: OnClickEvent) => {
    this.onClickResult = $event;
  };

  onRatingChange = ($event: OnRatingChangeEven) => {
    this.onRatingChangeResult = $event;
  };

  onHoverRatingChange = ($event: OnHoverRatingChangeEvent) => {
    this.onHoverRatingChangeResult = $event;
  };

  ngOnInit() {
    this.noReviews = (this.reviews.length === 0);

    if (!this.noReviews) {
      this.noReviews = false;

      let reviewsObj = this.reviews;
      this.reviews = new Array;
      let i;
      for (i = 0; i < reviewsObj.length; i++) {
        let user: any = reviewsObj[i].user;
        let image = this.appService.initialiseUserImage(user);
        user.image = image;
        this.reviews.push(new ReviewsModel(reviewsObj[i].id, reviewsObj[i].note, reviewsObj[i].title, reviewsObj[i].text, reviewsObj[i].date, user));
      }
    } else {
      this.noReviews = true;
      console.info("this.noReviews dans (else) ");
      console.info(this.noReviews);
    }
  }

}
