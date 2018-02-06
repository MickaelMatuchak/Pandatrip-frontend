import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {VisitModel} from './visit.model';
import {VisitService} from './visit.service';
import {PositionService} from './position.service';

@Component({
  selector: 'visits',
  templateUrl: 'visit.component.html',
  styleUrls: ['visit.component.css', '../../../node_modules/bulma/css/bulma.css'],
  providers: [VisitService, PositionService]
})

export class VisitComponent implements OnInit {
  lineVisits = [];
  selectedVisitModel: VisitModel;
  location = {};
  ville : string;
  /*  setPosition(position){
   this.location = position.coords;
   console.log(position.coords);
   }*/

  constructor(private router: Router,
              private visitService: VisitService,
              private positionService: PositionService) {
  }

  separateLine = function (nbElementPerLine, visits) {
    let array = new Array();

    for (let i = 0; i < visits.length; i++) {

      if (i % nbElementPerLine === 0) {
        array = new Array();
        this.lineVisits.push(array);
      }

      array.push(
        new VisitModel(visits[i].id, visits[i].name, visits[i].images, visits[i]['reviews'], visits[i].latitude,
          visits[i].longitude, visits[i].adresse, visits[i].country, visits[i].region, visits[i].city, visits[i].postalCode,
          visits[i].description, visits[i].note, visits[i].nbNotes, visits[i].site)
      );
    }
  };

  readVisitsPromise() {
    this.visitService.getNumbersVisits(8)
      .then((data: Object[]) => {
          this.separateLine(4, data['hydra:member']);
        }
      );
  }

  onSelect(visit: VisitModel, event: any) {
    event.stopPropagation();
    this.selectedVisitModel = visit;
    this.gotoDetail();
  }

  gotoDetail() {
    this.router.navigate(['/visit', this.selectedVisitModel.name]);
  }

  ngOnInit() {
    this.readVisitsPromise();

    this.getLieu();
  }

  getLieu(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        //console.log(position.coords.latitude);
        //console.log(position.coords.longitude);

        let lieu;

        this.positionService.getPosition(position.coords.latitude, position.coords.longitude).then(
          data => {
            if(data['results'][0] != undefined){
              lieu = data['results'][0];
              //console.log(lieu['address_components'][6]['short_name']);
              //console.log(lieu['address_components'][2]['short_name']);
              this.ville = lieu['address_components'][2]['short_name'];
            }
          }
        )
      });
    }
  }
}

@Component({
  selector: 'visits-suggestion',
  templateUrl: 'visit-suggestion.component.html',
  styleUrls: ['visit.component.css', '../../../node_modules/bulma/css/bulma.css'],
  providers: [VisitService]
})

export class VisitSuggestionComponent implements OnInit {
  visits: VisitModel[] = [];
  @Input('visitSelected')
  visitSelected: VisitModel;

  constructor(private visitService: VisitService, private router: Router) {
  }

  ngOnInit(): void {
    this.visitService.getNumbersVisits(4)
      .then((data: Object[]) => {
          const visits = data['hydra:member'];

          for (let i = 0; i < visits.length; i++) {
            if (visits[i].name !== this.visitSelected.name) {
              this.visits.push(new VisitModel(visits[i].id, visits[i].name, visits[i].images, null, null, null,
                visits[i].address, visits[i].country, visits[i].region, visits[i].city, visits[i].postalCode,
                visits[i].description, visits[i].note, null, null));
            }
          }
        }
      );
  }

  onSelect(visit, event) {
    this.router.navigate(['visit/' + visit.name]);
  }
}
