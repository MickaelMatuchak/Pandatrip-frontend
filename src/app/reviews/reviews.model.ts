export class ReviewsModel {
  constructor(id: number, note : number, title : string, text : string, date : string, user: string) {
    this.id = id;
    this.note = note;
    this.title = title;
    this.text = text;
    this.date = date;
    this.user = user;
  }

  id : number;
  note : number;
  title : string;
  text : string;
  date : string;
  user: string;
}
