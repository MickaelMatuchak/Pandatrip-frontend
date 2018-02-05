import {ImageModel} from '../image/image.model';
import {VisitModel} from '../visit/visit.model';

export class ThemeModel {
  constructor(id: number, name: string,
              image: ImageModel, visits: VisitModel[]) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.visits = visits;
  }

  id: number;
  name: string;
  image: ImageModel;
  visits: VisitModel[];
}
