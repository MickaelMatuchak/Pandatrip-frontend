import {ImageModel} from '../image/image.model';
import {VisitModel} from '../visit/visit.model';
import {GuideModel} from '../guide/guide.model';

export class UserModel {
  constructor(id: number, username: string, gender: string,
              firstname: string, lastname: string, mail: string,
              image: ImageModel) {
    this.id = id;
    this.username = username;
    this.gender = gender;
    this.firstname = firstname;
    this.lastname = lastname;
    this.mail = mail;
    this.image = image;
  }

  id: number;
  username: string;
  gender: string;
  firstname: string;
  lastname: string;
  mail: string;
  image: ImageModel;
}

export class ParcoursModel {
  constructor(id: number, visitUser: VisitUser[], user: string, name: string) {
    this.id = id;
    this.visitUser = visitUser;
    this.user = user;
    this.name = name;
  }

  id: number;
  visitUser: VisitUser[];
  user: string;
  name: string;
}

export class VisitUser {
  constructor(id: number, visit: VisitModel, user: UserModel,
              visitGuide: VisitGuideModel, isValidated: boolean, parcours: ParcoursModel, isConfirm: boolean) {
    this.id = id;
    this.visit = visit;
    this.user = user;
    this.visitGuide = visitGuide;
    this.isValidated = isValidated;
    this.parcours = parcours;
    this.isConfirm = isConfirm;
  }

  id: number;
  visit: VisitModel;
  user: UserModel;
  visitGuide: VisitGuideModel;

  // si false : visite guidée pas validé par guide
  // si true : visite guidée validé par guide
  isValidated: boolean;
  // si false : En attente de validation
  // si true : Visite répondu
  isConfirm: boolean;
  parcours: ParcoursModel;
}

export class VisitGuideModel {
  constructor(id: number, visit: VisitModel, guide: GuideModel,
              date: string, duration: number, price: number,
              isAvailable: boolean) {
    this.id = id;
    this.visit = visit;
    this.guide = guide;
    this.date = date;
    this.duration = duration; // min
    this.price = price; // €
    this.isAvailable = isAvailable;
  }

  id: number;
  visit: VisitModel;
  guide: GuideModel;
  date: string;
  duration: number; // min
  price: number; // €
  isAvailable: boolean;
}
