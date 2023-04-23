import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'wrapup-h1',
  templateUrl: './h1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H1Component {
  @Input() classes = '';
}
