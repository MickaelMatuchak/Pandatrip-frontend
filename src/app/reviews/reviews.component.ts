import { Component, OnInit, Input } from '@angular/core';
import { ReviewsModel } from "./reviews.model";

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css', '../../../node_modules/bulma/css/bulma.css']
})
export class ReviewsComponent implements OnInit {

  @Input()
  reviews: ReviewsModel[];

  constructor() { }

  ngOnInit() {
  }

}
