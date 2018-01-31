import {GuideModel} from '../guide/guide.model';

export class GuideVisitModel {
  constructor(id: number, visit: string, guide: GuideModel, date: string, duration: number, price: number, isAvailable: number) {
    this.id = id;
    this.visit = visit;
    this.guide = guide;
    this.date = date;
    this.duration = duration;
    this.price = price;
    this.isAvailable = isAvailable;
  }

  id: number;
  visit: string;
  guide: GuideModel;
  date: string;
  duration: number;
  price: number;
  isAvailable: number;
}
