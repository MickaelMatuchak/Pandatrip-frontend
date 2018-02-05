import {Component, OnInit} from '@angular/core';
import {VisitModel} from '../visit/visit.model';
import {ImageModel} from '../image/image.model';
import {ReviewsModel} from '../reviews/reviews.model';

const VISITS: VisitModel[] = [
  {
    id: 1,
    name: 'Parc animalier et botanique & Parcabout de Branféré',
    images: ImageModel[''],
    address: '1 rue mock',
    reviews: ReviewsModel[''],
    latitude: null,
    longitude: null,
    country: 'France',
    region: 'Bretagne',
    city: 'Le Guerno',
    postalCode: null,
    description: 'Super parc',
    note: 4,
    nbNotes: 2,
    site: ''
  },
  {
    id: 1,
    name: 'Parc animalier et botanique & Parcabout de Branféré',
    images: ImageModel[''],
    address: '1 rue mock',
    reviews: ReviewsModel[''],
    latitude: null,
    longitude: null,
    country: 'France',
    region: 'Bretagne',
    city: 'Le Guerno',
    postalCode: null,
    description: 'Super parc',
    note: 4,
    nbNotes: 2,
    site: ''
  },
];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../../../node_modules/bulma/css/bulma.css']
})

export class SearchComponent implements OnInit {

  searchs = VISITS;

  constructor() {
  }

  ngOnInit() {
  }
}
