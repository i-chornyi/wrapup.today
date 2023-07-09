import { Pipe, PipeTransform } from '@angular/core';
import { UserProfile } from '@wrapup/api-interfaces';
import { getUserInitials } from '../utils/user-avatar.util';
import { NullUndefined } from '../common.interface';

@Pipe({
  name: 'userInitials',
})
export class UserInitialsPipe implements PipeTransform {
  transform(user: UserProfile | NullUndefined): string {
    if (!user) {
      return '';
    }

    return getUserInitials({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}
