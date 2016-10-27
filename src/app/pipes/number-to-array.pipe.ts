import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {
  transform(value) {
    return (new Array(value)).fill(1);
  }
}
