import {ReviewsModel} from "../reviews/reviews.model";
import {UserModel, VisitGuideModel} from "../profil/profil.model";

export class GuideModel {
  constructor(id: number, billfold: number, reviews: ReviewsModel[],
              user: UserModel, address: string, country: string,
              region: string, city: string, postalCode: number,
              phoneNumber: string, listVisits: VisitGuideModel[]) {
    this.id = id;
    this.billfold = billfold;
    this.reviews = reviews;
    this.user = user;
    this.address = address;
    this.country = country;
    this.region = region;
    this.city = city;
    this.postalCode = postalCode;
    this.phoneNumber = phoneNumber;
    this.listVisits = listVisits;
  }

  id: number;
  billfold: number;
  reviews: ReviewsModel[];
  user: UserModel;
  address: string;
  country: string;
  region: string;
  city: string;
  postalCode: number;
  phoneNumber: string;
  listVisits: VisitGuideModel[];
  note: number;
}
