import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchFilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'search-filter',
})
export class SearchFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], filter: any): any {
      if (!items || !filter) {
          return items;
      }
      return items.filter(item => item.type.indexOf(filter.type) !== -1);
  }
}
