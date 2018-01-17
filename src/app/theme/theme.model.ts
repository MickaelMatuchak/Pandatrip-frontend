export class ThemeModel {
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  
  id: number;
  name: string;
  image: string;
  visits: Object[];
}
