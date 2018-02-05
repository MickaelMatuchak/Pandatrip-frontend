import {VisitModel} from '../visit/visit.model';
import {GuideVisitModel} from './guide-visit.model';

export class ItemVisitModel {
  constructor(visit: VisitModel, guideVisit: GuideVisitModel) {
    this.visit = visit;
    this.guideVisit = guideVisit;
  }
  visit: VisitModel;
  guideVisit: GuideVisitModel;
  parcours: string;
  user: string;
  isValidated: boolean = false;
}
