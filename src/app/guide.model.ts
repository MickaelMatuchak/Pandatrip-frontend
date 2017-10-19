export class GuideModel {
  constructor(id: number, name: string, image: string, note: number) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.note = note;
  }
  id: number;
  name: string;
  image: string;
  note: number;
}