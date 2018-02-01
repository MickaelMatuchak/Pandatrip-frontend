import {Component, OnInit} from '@angular/core';
import {VisitService} from '../visit/visit.service';
import {ImageModel} from "../image/image.model";
import {VisitModel} from "../visit/visit.model";
import {ItemVisitModel} from "../visit-details/item-visit.model";

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css', '../../../node_modules/bulma/css/bulma.css', '../../../node_modules/font-awesome/css/font-awesome.css'],
})
export class RecapComponent implements OnInit {
  title: string;
  public show: boolean = false;
  public buttonName: any = 'Show';
  itemsVisit: ItemVisitModel[];

  constructor() {
    this.title = 'Parcours Sans Nom';
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (!this.show) {
      this.buttonName = 'Show';
    } else {
      this.buttonName = 'Hide';
    }
  }

  ngOnInit() {
    if (localStorage.getItem('visits') !== undefined) {
      this.itemsVisit = JSON.parse(localStorage.getItem('visits'));
    }
  }
}
