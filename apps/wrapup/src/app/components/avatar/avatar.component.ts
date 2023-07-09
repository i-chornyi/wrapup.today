import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UserProfile } from '@wrapup/api-interfaces';
import { getAvatarDataFromAvatarSettings } from '../../utils/user-avatar.util';
import { NullUndefined } from '../../common.interface';
import { NgStyle } from '@angular/common';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'wrapup-avatar',
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgStyle, SharedModule],
})
export class AvatarComponent implements OnChanges {
  @Input() userProfile: UserProfile | NullUndefined;

  _avatarSettings!: string;

  ngOnChanges({ userProfile }: SimpleChanges) {
    if (userProfile.currentValue) {
      this._avatarSettings = getAvatarDataFromAvatarSettings(
        this.userProfile?.avatar,
      );
    }
  }
}
