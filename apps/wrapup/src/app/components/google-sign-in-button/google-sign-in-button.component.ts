import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'wrapup-google-sign-in-button',
  templateUrl: './google-sign-in-button.component.html',
  styleUrls: ['./google-sign-in-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleSignInButtonComponent {
  @Input() label = 'Sign in with Google';

  url = environment.apiHost + '/auth/google';
}
