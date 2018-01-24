import { Component, OnInit, Input } from '@angular/core';
import { ReviewsModel } from "./reviews.model";
import { isNull } from 'util';
import { ImageModel } from '../image/image.model';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css', '../../../node_modules/bulma/css/bulma.css']
})
export class ReviewsComponent implements OnInit {

  @Input('Reviews')
  reviews: ReviewsModel[];

  constructor() {
   }

  ngOnInit() {

    if(this.reviews) {
      let reviewsObj = this.reviews;
      this.reviews = new Array;
      var i: number = 0;
      for(i = 0; i < reviewsObj.length; i++) {
        let user = reviewsObj[i].user;
        if(isNull(user["image"])) {
          if(user["sexe"] == "male") {
            user["image"] = new ImageModel(0, "boy.png", "avatar.male");
          } else {
            user["image"] = new ImageModel(0, "girl.png", "avatar.female");
          } 
        } else {
          user["image"] = new ImageModel(user["image"]["id"], user["image"]["url"], user["image"]["description"]);
        }
        this.reviews.push( new ReviewsModel( reviewsObj[i].id, reviewsObj[i].note, reviewsObj[i].title, reviewsObj[i].text, reviewsObj[i].date, user) );
      }
    }
  }

}
