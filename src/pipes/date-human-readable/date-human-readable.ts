import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the DateHumanReadablePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'dateHumanReadable',
})
export class DateHumanReadablePipe implements PipeTransform {
  
  transform(value: string, ...args) {
    return moment.utc(value).fromNow();
  }
}
