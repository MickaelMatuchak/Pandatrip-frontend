import {Component, OnInit, Input} from '@angular/core';
import {ReviewsModel} from './reviews.model';
import {isNull} from 'util';
import {ImageModel} from '../image/image.model';
import {
  OnClickEvent,
  OnRatingChangeEven,
  OnHoverRatingChangeEvent
} from './../../../node_modules/angular-star-rating/star-rating-struct';


@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css', '../../../node_modules/bulma/css/bulma.css', './star-rating.scss']
})
export class ReviewsComponent implements OnInit {

  @Input('Reviews')
  reviews: ReviewsModel[];

  constructor() {
  }

  onClickResult: OnClickEvent;
  onHoverRatingChangeResult: OnHoverRatingChangeEvent;
  onRatingChangeResult: OnRatingChangeEven;

  onClick = ($event: OnClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;
  };

  onRatingChange = ($event: OnRatingChangeEven) => {
    console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;
  };

  onHoverRatingChange = ($event: OnHoverRatingChangeEvent) => {
    console.log('onHoverRatingChange $event: ', $event);
    this.onHoverRatingChangeResult = $event;
  };

  ngOnInit() {

    if (this.reviews) {
      let reviewsObj = this.reviews;
      this.reviews = new Array;
      let i: number = 0;
      for (i = 0; i < reviewsObj.length; i++) {
        let user = reviewsObj[i].user;
        if (isNull(user["image"])) {
          if (user["sexe"] == "male") {
            user["image"] = new ImageModel(0, "boy.png", "avatar.male");
          } else {
            user["image"] = new ImageModel(0, "girl.png", "avatar.female");
          }
        } else {
          user["image"] = new ImageModel(user["image"]["id"], user["image"]["url"], user["image"]["description"]);
        }
        this.reviews.push(new ReviewsModel(reviewsObj[i].id, reviewsObj[i].note, reviewsObj[i].title, reviewsObj[i].text, reviewsObj[i].date, user));
      }
    }
  }
}
