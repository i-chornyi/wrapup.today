import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayComponent } from './day.component';
import { DateTime } from 'luxon';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transform date into on letter day name in the ngOnInit hook', () => {
    component.day = DateTime.fromISO('2022-11-21');
    expect(component.dayAsString).toBeUndefined();
    component.ngOnInit();
    expect(component.dayAsString).toBe('21');
  });
});
