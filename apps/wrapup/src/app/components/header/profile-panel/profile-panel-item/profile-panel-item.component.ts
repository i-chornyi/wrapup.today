import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'wrapup-profile-panel-item',
  templateUrl: './profile-panel-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, NgIf, NgTemplateOutlet],
})
export class ProfilePanelItemComponent {
  @Input() url!: string[];

  @Output() itemClick = new EventEmitter<void>();

  handleItemClick() {
    this.itemClick.emit();
  }
}
