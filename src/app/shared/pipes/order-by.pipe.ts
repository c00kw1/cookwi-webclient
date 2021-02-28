import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(
    array: any[],
    by: string,
    order: boolean | 'asc' | 'desc' = 'asc'
  ): any[] {
    return _.orderBy(array, [by], [order]);
  }
}
