import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'name',
  pure: true
})
export class NamePipe implements PipeTransform {
  transform(value: any, args: any): any {
    let index = args;
    if (value) {
      const parts = value.split(' ');
      if (parts.length === 1) {
        return parts[0];
      }
      else if (parts.length === 2) {
        return parts[index];
      }
      else if (parts.length > 2) { // More parts than in traditional name (first name + last name)
        if (index === 1) { // If trying to take last part, lets take the absolutely last part
          index = parts.length - 1;
        }
        return parts[index];
      }
    }

    return undefined;
  }

}
