import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (value) {
      const substring = value.slice(0, limit) + '...';
      return (limit && limit < value.length) ? substring : value;
    }
  }

}
