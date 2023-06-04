import { AvatarSettings, UserFullName } from '@wrapup/api-interfaces';
import {
  getAvatarDataFromAvatarSettings,
  getUserInitials,
} from './user-avatar.util';

describe('UserAvatarUtil', () => {
  it('should return a background color string out of avatar settings', () => {
    const avatarSettings: AvatarSettings = {
      angle: 25,
      colors: ['#000', '#111', '#222'],
    };
    const result = getAvatarDataFromAvatarSettings(avatarSettings);
    expect(result).toBe('linear-gradient(25deg, #000 0%, #111 50%, #222 100%)');
  });

  it('should return one letter of the firstName if no lastName', () => {
    const userName: UserFullName = {
      firstName: 'John',
      lastName: undefined,
    };
    const result = getUserInitials(userName);
    expect(result).toBe('J');
  });

  it('should return two letters of the firstName and the lastName', () => {
    const userName: UserFullName = {
      firstName: 'John',
      lastName: 'Doe',
    };
    const result = getUserInitials(userName);
    expect(result).toBe('JD');
  });

  it('should return an empty string if no firstName and lastName', () => {
    const userName: UserFullName = {
      firstName: undefined,
      lastName: undefined,
    };
    const result = getUserInitials(userName);
    expect(result).toBe('');
  });
});
