import { Component, OnInit } from '@angular/core';
import { ReviewsModel } from "./reviews.model";

const REVIEWS: ReviewsModel[] = [
  { id: 1, author: 'Jean', avatar:'boy.png', note: 5, title: "Vraiment pas mal...", text: "A la télé, on se rend pas compte à quel point le monument est imposant. Dire que l'arc de triomphe se tient là, débout, depuis des siècles et qu'il n'a presque pas pris une ride donne vraiment le vertige. A voir absolument au moins une fois dans sa vie !", date: '20/01/2018'},
  { id: 2, author: 'Alice', avatar:'girl.png', note: 4.5, title: "Mythique", text: "Résolument incontournable, quelle pièce d'histoire !", date: '18/01/2018'},
];

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css', '../../../node_modules/bulma/css/bulma.css']
})
export class ReviewsComponent implements OnInit {

  reviews = REVIEWS;

  constructor() { }

  ngOnInit() {
  }

}
