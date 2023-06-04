import { AvatarSettings, UserFullName } from '@wrapup/api-interfaces';

export const getAvatarDataFromAvatarSettings = (
  avatarSettings: AvatarSettings,
): string => {
  return `linear-gradient(${avatarSettings.angle}deg, ${avatarSettings.colors[0]} 0%, ${avatarSettings.colors[1]} 50%, ${avatarSettings.colors[2]} 100%)`;
};

export const getUserInitials = (name: UserFullName): string => {
  let result = '';

  name.firstName && (result += name.firstName[0]);
  name.lastName && (result += name.lastName[0]);

  return result;
};
