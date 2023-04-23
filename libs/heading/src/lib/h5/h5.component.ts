import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'wrapup-h5',
  templateUrl: './h5.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H5Component {
  @Input() classes = '';
}
