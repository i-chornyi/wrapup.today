import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '@ngneat/svg-icon';

@Component({
  selector: 'wrapup-add-wrapup-card-button',
  templateUrl: './add-wrapup-card-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
})
export class AddWrapupCardButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();

  handleButtonClick() {
    this.buttonClick.emit();
  }
}
