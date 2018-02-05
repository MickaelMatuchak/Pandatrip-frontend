import {Component, OnInit, Injectable, Input} from '@angular/core';
import { VisitModel } from '../visit/visit.model';
import {ImageModel} from '../image/image.model';
import {ReviewsModel} from '../reviews/reviews.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/min';
import {VisitService} from '../visit/visit.service';
import {ActivatedRoute} from "@angular/router";

const VISITS: VisitModel[] = [
  { id: 1, name: 'Parc animalier et botanique & Parcabout de Branféré', images: ImageModel[''],address: '1 rue mock', reviews: ReviewsModel[''], latitude: null, longitude: null, country: "France", region: "Bretagne", city: "Le Guerno", postalCode: null, description:"Super parc", note: 4, nbNotes:2, site:""},
  { id: 1, name: 'Parc animalier et botanique & Parcabout de Branféré', images: ImageModel[''],address: '1 rue mock', reviews: ReviewsModel[''], latitude: null, longitude: null, country: "France", region: "Bretagne", city: "Le Guerno", postalCode: null, description:"Super parc", note: 4, nbNotes:2, site:""},
];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../../../node_modules/bulma/css/bulma.css'],
  providers: [ VisitService ]
})

export class SearchComponent implements OnInit {

  searchs = VISITS;


  visits: VisitModel[];

  filter: VisitModel = new VisitModel(null, '', [],
  [], null, null,
  '', '', '',
  '', null, '',
  null, null, '');



  constructor(private visitService: VisitService,
    private route: ActivatedRoute) {
  }


  ngOnInit() {

    this.route.params.subscribe(params => this.filter.name = params['q']);

    this.visitService.getVisitsObervable().subscribe(
      (data) => {
        this.visits = data;
/*        this.numberOfVisits = this.visits.length;
        this.limit = this.visits.length; // Start off by showing all books on a single page.*!/*/

      });


  }
}
