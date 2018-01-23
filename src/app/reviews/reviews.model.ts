export class ReviewsModel {
  constructor(id: number, author: string, avatar: string, note : number, title : string, text : string, date : string) {
    this.id = id;
    this.author = author;
    this.avatar = avatar;
    this.note = note;
    this.title = title;
    this.text = text;
    this.date = date;
  }
  id : number;
  author : string;
  avatar : string;
  note : number;
  title : string;
  text : string;
  date : string;
}
