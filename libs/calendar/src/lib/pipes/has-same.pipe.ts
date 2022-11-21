import { Pipe, PipeTransform } from '@angular/core';
import { DateTime, DateTimeUnit } from 'luxon';

@Pipe({
  name: 'hasSame',
})
export class HasSamePipe implements PipeTransform {
  transform(
    firstValue: DateTime,
    secondValue: DateTime,
    granularity: DateTimeUnit,
  ): boolean {
    return firstValue.hasSame(secondValue, granularity);
  }
}
