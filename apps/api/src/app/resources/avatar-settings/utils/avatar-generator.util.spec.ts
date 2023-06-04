import {
  generateAvatarSettings,
  getAngleSettings,
  getColors,
  getRandomAvatarColor,
  getRandomNumberWithin,
} from './avatar-generator.util';
import { AVATAR_COLORS } from '../colors.const';

describe('avatar generator util', () => {
  describe('random number generator', () => {
    it('should generate a random whole number in a specified range', () => {
      const result = getRandomNumberWithin(12, 432);

      expect(result).toBeGreaterThanOrEqual(12);
      expect(result).toBeLessThanOrEqual(432);
      expect(result % result).toBe(0);

      expect(getRandomNumberWithin(1, 1)).toBe(1);
    });
  });

  describe('avatar colors', () => {
    it('should return a random color from the AVATAR_COLORS array', () => {
      const result = getRandomAvatarColor();

      expect(result).toEqual(expect.any(String));
      expect(AVATAR_COLORS.includes(result)).toBeTruthy();
    });

    it('should return an array of 3 colors', () => {
      const result = getColors();

      expect(result.length).toBe(3);
    });
  });

  describe('avatar position settings', () => {
    it('should return random values for x and y', () => {
      const result = getAngleSettings();

      expect(result).toEqual(expect.any(Number));
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(360);
    });
  });

  describe('avatar settings', () => {
    it('should return an avatar settings object', () => {
      const result = generateAvatarSettings();

      expect(result).toEqual({
        angle: expect.any(Number),
        colors: expect.any(Object),
      });
    });
  });
});
