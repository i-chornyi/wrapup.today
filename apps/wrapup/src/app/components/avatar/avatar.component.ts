import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AvatarSettings } from '@wrapup/api-interfaces';
import { getAvatarDataFromAvatarSettings } from '../../utils/user-avatar.util';

@Component({
  selector: 'wrapup-avatar',
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  @Input() avatarSettings!: AvatarSettings;
  @Input() initials = '';

  _avatarSettings!: string;

  ngOnInit() {
    this._avatarSettings = getAvatarDataFromAvatarSettings(this.avatarSettings);
  }
}
