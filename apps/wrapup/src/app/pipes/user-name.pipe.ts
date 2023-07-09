import { Pipe, PipeTransform } from '@angular/core';
import { UserProfile } from '@wrapup/api-interfaces';
import { NullUndefined } from '../common.interface';

@Pipe({
  name: 'userName',
})
export class UserNamePipe implements PipeTransform {
  transform(profile: UserProfile | NullUndefined): string {
    if (!profile) {
      return '';
    }

    if (!profile.firstName) {
      return profile.email;
    }

    let userName = profile.firstName;

    if (profile.lastName) {
      userName += ` ${profile.lastName}`;
    }

    return userName;
  }
}
