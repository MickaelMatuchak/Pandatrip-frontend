export class RecapModel {
  constructor(id: number, image: string, nom: string, date: string, guide: string, guide_image: string) {
    this.id = id;
    this.image = image;
    this.nom = nom;
    this.date = date;
    this.guide = guide;
    this.guide_image = guide_image;
  }
  id : number;
  image: string;
  nom: string;
  date: string;
  guide: string;
  guide_image: string;
}
