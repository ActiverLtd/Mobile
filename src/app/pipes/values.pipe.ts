import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value !== 'object') {
      return [];
    }
    return Object.values(value);
  }

}
