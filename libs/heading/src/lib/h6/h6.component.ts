import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'wrapup-h6',
  templateUrl: './h6.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H6Component {
  @Input() classes = '';
}
