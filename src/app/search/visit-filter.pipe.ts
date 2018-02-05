import { Pipe, PipeTransform } from '@angular/core';

import {VisitModel} from "../visit/visit.model";

@Pipe({
    name: 'visitfilter',
    pure: false
})
export class VisitFilterPipe implements PipeTransform {
  transform(items: VisitModel[], filter: VisitModel): VisitModel[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: VisitModel) => this.applyFilter(item, filter));
  }

  applyFilter(visit: VisitModel, filter: VisitModel): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (visit[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (visit[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
