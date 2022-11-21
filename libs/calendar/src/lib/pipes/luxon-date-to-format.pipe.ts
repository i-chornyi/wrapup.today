import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'luxonDateToFormat',
})
export class LuxonDateToFormatPipe implements PipeTransform {
  transform(value: DateTime, format: string): string {
    return value.toFormat(format);
  }
}
