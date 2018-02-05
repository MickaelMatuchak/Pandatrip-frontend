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
      let postalCode = visit['postalCode'] + '';

      if (visit['name'].toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1 || visit['region'].toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1 ||
        visit['address'].toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1 || visit['city'].toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1 ||
        postalCode.toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1) {
        return true;
      }

    return false;
  }
}
