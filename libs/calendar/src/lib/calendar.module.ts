import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { HasSamePipe } from './pipes/has-same.pipe';
import { LuxonDateToFormatPipe } from './pipes/luxon-date-to-format.pipe';

@NgModule({
  declarations: [
    CalendarComponent,
    DayComponent,
    HasSamePipe,
    LuxonDateToFormatPipe,
  ],
  imports: [CommonModule],
  exports: [CalendarComponent, LuxonDateToFormatPipe],
})
export class CalendarModule {}
