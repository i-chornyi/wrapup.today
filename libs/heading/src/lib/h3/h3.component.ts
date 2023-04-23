import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'wrapup-h3',
  templateUrl: './h3.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H3Component {
  @Input() classes = '';
}
