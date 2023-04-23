import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'wrapup-h4',
  templateUrl: './h4.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H4Component {
  @Input() classes = '';
}
