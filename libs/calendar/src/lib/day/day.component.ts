import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'wrapup-day',
  templateUrl: './day.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent implements OnInit {
  @Input() day!: DateTime;
  @Input() isSelected = false;
  @Input() isCurrentMonth = true;

  @Output() dayClick = new EventEmitter<DateTime>();

  dayAsString!: string;

  constructor() {}

  ngOnInit(): void {
    this.dayAsString = this.day?.toFormat('d');
  }

  handleDayClick() {
    this.dayClick.emit(this.day);
  }
}
