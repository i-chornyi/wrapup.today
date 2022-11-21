import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'wrapup-calendar',
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  @Output() selectedDayChange = new EventEmitter<DateTime>();

  days: DateTime[] = [];

  selectedDay = DateTime.local();
  currentMonth = DateTime.local();

  dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  ngOnInit(): void {
    this.days = this.generateMonthDaysDataForDate(DateTime.local());
  }

  /**
   * Generate an array of days of the given month with possible days before and after to have the complete first and last weeks.
   *
   * @param date - some day of the month to generate data for
   */
  generateMonthDaysDataForDate(date: DateTime): DateTime[] {
    const result: DateTime[] = [];

    const firstDay = date.startOf('month').startOf('week');
    const lastDay = date.endOf('month').endOf('week');

    result.push(firstDay);

    while (!result[result.length - 1].hasSame(lastDay, 'day')) {
      result.push(result[result.length - 1].plus({ day: 1 }));
    }

    return result;
  }

  showPreviousMonth() {
    this.changeMonth(this.currentMonth.minus({ month: 1 }));
  }

  showNextMonth() {
    this.changeMonth(this.currentMonth.plus({ month: 1 }));
  }

  changeMonth(newMonth: DateTime) {
    this.days = this.generateMonthDaysDataForDate(newMonth);
    this.currentMonth = newMonth;
  }

  handleDayClick(day: DateTime) {
    this.selectedDay = day;
    this.selectedDayChange.emit(day);

    if (!this.selectedDay.hasSame(this.currentMonth, 'month')) {
      this.changeMonth(this.selectedDay);
    }
  }

  trackByFn(index: number, item: DateTime) {
    return item.toISODate();
  }
}
