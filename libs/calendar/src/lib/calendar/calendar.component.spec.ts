import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { DateTime } from 'luxon';
import { DayComponent } from '../day/day.component';
import { HasSamePipe } from '../pipes/has-same.pipe';
import { LuxonDateToFormatPipe } from '../pipes/luxon-date-to-format.pipe';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CalendarComponent,
        DayComponent,
        HasSamePipe,
        LuxonDateToFormatPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("should generate month's days for a given date", () => {
    it("should generate month's days for November 2022 + last October's day and first 4 December's days", () => {
      const date = DateTime.fromISO('2022-11-20');
      const expectedResult = [
        DateTime.fromISO('2022-10-31'),
        DateTime.fromISO('2022-11-01'),
        DateTime.fromISO('2022-11-02'),
        DateTime.fromISO('2022-11-03'),
        DateTime.fromISO('2022-11-04'),
        DateTime.fromISO('2022-11-05'),
        DateTime.fromISO('2022-11-06'),
        DateTime.fromISO('2022-11-07'),
        DateTime.fromISO('2022-11-08'),
        DateTime.fromISO('2022-11-09'),
        DateTime.fromISO('2022-11-10'),
        DateTime.fromISO('2022-11-11'),
        DateTime.fromISO('2022-11-12'),
        DateTime.fromISO('2022-11-13'),
        DateTime.fromISO('2022-11-14'),
        DateTime.fromISO('2022-11-15'),
        DateTime.fromISO('2022-11-16'),
        DateTime.fromISO('2022-11-17'),
        DateTime.fromISO('2022-11-18'),
        DateTime.fromISO('2022-11-19'),
        DateTime.fromISO('2022-11-20'),
        DateTime.fromISO('2022-11-21'),
        DateTime.fromISO('2022-11-22'),
        DateTime.fromISO('2022-11-23'),
        DateTime.fromISO('2022-11-24'),
        DateTime.fromISO('2022-11-25'),
        DateTime.fromISO('2022-11-26'),
        DateTime.fromISO('2022-11-27'),
        DateTime.fromISO('2022-11-28'),
        DateTime.fromISO('2022-11-29'),
        DateTime.fromISO('2022-11-30'),
        DateTime.fromISO('2022-12-01'),
        DateTime.fromISO('2022-12-02'),
        DateTime.fromISO('2022-12-03'),
        DateTime.fromISO('2022-12-04'),
      ];

      expect(component.generateMonthDaysDataForDate(date)).toEqual(
        expectedResult,
      );
    });

    it("should generate month's days for February 2021 (starts on Monday and ends on Sunday)", () => {
      const date = DateTime.fromISO('2021-02-01');
      const expectedResult = [
        DateTime.fromISO('2021-02-01'),
        DateTime.fromISO('2021-02-02'),
        DateTime.fromISO('2021-02-03'),
        DateTime.fromISO('2021-02-04'),
        DateTime.fromISO('2021-02-05'),
        DateTime.fromISO('2021-02-06'),
        DateTime.fromISO('2021-02-07'),
        DateTime.fromISO('2021-02-08'),
        DateTime.fromISO('2021-02-09'),
        DateTime.fromISO('2021-02-10'),
        DateTime.fromISO('2021-02-11'),
        DateTime.fromISO('2021-02-12'),
        DateTime.fromISO('2021-02-13'),
        DateTime.fromISO('2021-02-14'),
        DateTime.fromISO('2021-02-15'),
        DateTime.fromISO('2021-02-16'),
        DateTime.fromISO('2021-02-17'),
        DateTime.fromISO('2021-02-18'),
        DateTime.fromISO('2021-02-19'),
        DateTime.fromISO('2021-02-20'),
        DateTime.fromISO('2021-02-21'),
        DateTime.fromISO('2021-02-22'),
        DateTime.fromISO('2021-02-23'),
        DateTime.fromISO('2021-02-24'),
        DateTime.fromISO('2021-02-25'),
        DateTime.fromISO('2021-02-26'),
        DateTime.fromISO('2021-02-27'),
        DateTime.fromISO('2021-02-28'),
      ];

      expect(component.generateMonthDaysDataForDate(date)).toEqual(
        expectedResult,
      );
    });
  });

  it('should change current month', () => {
    component.currentMonth = DateTime.fromISO('2022-02-28');
    component.changeMonth(DateTime.fromISO('2022-01-28'));

    expect(component.currentMonth).toEqual(DateTime.fromISO('2022-01-28'));
    expect(component.currentMonth).not.toEqual(DateTime.fromISO('2022-02-28'));
    expect(component.days).toEqual(
      component.generateMonthDaysDataForDate(component.currentMonth),
    );
  });

  it('should show previous month', () => {
    const changeMonthSpy = jest.spyOn(component, 'changeMonth');
    component.showPreviousMonth();

    expect(changeMonthSpy).toBeCalledTimes(1);
  });

  it('should show next month', () => {
    const changeMonthSpy = jest.spyOn(component, 'changeMonth');
    component.showNextMonth();

    expect(changeMonthSpy).toBeCalledTimes(1);
  });

  describe('should handle day click', () => {
    let selectedDayChangeEmitSpy: jest.SpyInstance;
    let changeMonthSpy: jest.SpyInstance;

    let currentDate: DateTime;

    beforeEach(() => {
      selectedDayChangeEmitSpy = jest.spyOn(
        component.selectedDayChange,
        'emit',
      );
      changeMonthSpy = jest.spyOn(component, 'changeMonth');

      currentDate = DateTime.fromISO('2022-02-28');
    });

    it('should not change the current month', () => {
      const newDate = DateTime.fromISO('2022-02-15');

      component.currentMonth = currentDate;
      component.selectedDay = currentDate;

      component.handleDayClick(newDate);

      expect(selectedDayChangeEmitSpy).toBeCalledTimes(1);
      expect(component.selectedDay).toEqual(newDate);
      expect(component.currentMonth).toEqual(currentDate);
      expect(changeMonthSpy).not.toBeCalled();
    });

    it('should change the current month when the day from another month is picked', () => {
      const newDate = DateTime.fromISO('2022-01-15');

      component.currentMonth = currentDate;
      component.selectedDay = currentDate;

      component.handleDayClick(newDate);

      expect(selectedDayChangeEmitSpy).toBeCalledTimes(1);
      expect(component.selectedDay).toEqual(newDate);
      expect(component.currentMonth).toEqual(newDate);
      expect(changeMonthSpy).toHaveBeenCalledTimes(1);
    });
  });
});
