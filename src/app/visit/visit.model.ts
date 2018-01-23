import { ImageModel } from "../image/image.model";
import { ReviewsModel } from "../reviews/reviews.model";

export class VisitModel {
  constructor(id: number, name: string, images: ImageModel[],
    reviews: ReviewsModel[], latitude: number, longitude: number,
    address: string, country: string, region: string,
    city: string, postalCode: number, description: string,
    note: number, nbNotes: number, site: string) {
    this.id = id;
    this.name = name;
    this.images = images;
    this.reviews = reviews;
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
    this.country = country;
    this.region = region;
    this.city = city;
    this.postalCode = postalCode;
    this.description = description;
    this.note = note;
    this.nbNotes = nbNotes;
    this.site = site;
  }

  id: number;
  name: string;
  images: ImageModel[];
  reviews: Object[];
  latitude: number;
  longitude: number;
  address: string;
  country: string;
  region: string;
  city: string;
  postalCode: number;
  description: string;
  note: number;
  nbNotes: number;
  site: string;
}

export class VisitModel2 {
  constructor(id: number, name: string, address: string) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
  id: number;
  name: string;
  address: string;
}
