import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'wrapup-h2',
  templateUrl: './h2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H2Component {
  @Input() classes = '';
}
