import { Component } from '@angular/core';
import { GuideModel } from './guide.model';

@Component({
  selector: 'research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css', '../../node_modules/bulma/css/bulma.css']
})

export class ResearchComponent {
  researchValue = 'Arc de Triomphe, château, lac...';
}
