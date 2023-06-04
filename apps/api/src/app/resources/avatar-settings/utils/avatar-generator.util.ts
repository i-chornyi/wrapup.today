import { AvatarSettings, AvatarColors } from '@wrapup/api-interfaces';
import { AVATAR_COLORS } from '../colors.const';

export const generateAvatarSettings = (): AvatarSettings => {
  return {
    angle: getAngleSettings(),
    colors: getColors(),
  };
};

export const getAngleSettings = (): number => {
  return getRandomNumberWithin(0, 360);
};

export const getColors = (): AvatarColors => {
  const colors = new Set<string>();

  while (colors.size < 3) {
    colors.add(getRandomAvatarColor());
  }

  return [...colors];
};

export const getRandomAvatarColor = (): string => {
  const max = AVATAR_COLORS.length - 1;

  return AVATAR_COLORS[getRandomNumberWithin(0, max)];
};

export const getRandomNumberWithin = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
