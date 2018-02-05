import {Component, Input, Output, EventEmitter} from '@angular/core';
import {GuideModel} from '../guide/guide.model';
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'research',
  templateUrl: 'research.component.html',
  styleUrls: ['research.component.css', '../../../node_modules/bulma/css/bulma.css']
})

export class ResearchComponent {
  researchValue = 'Arc de Triomphe, Châteaux, Lac...';
  valueResearch: string = '';
  ancienUrl: string = '';

  constructor(private router: Router) {
  }


  search() {

    if (!this.router.url.match('/search;q=')) {
      this.ancienUrl = this.router.url;
    }

    if (this.valueResearch === '') {
      if (this.ancienUrl.length > 0) {
        this.router.navigate([decodeURI(this.ancienUrl)]);
      } else {
        this.router.navigate(['home']);
      }
    } else {
      this.router.navigate(['search', {q: this.valueResearch}]);
    }




  }
}
