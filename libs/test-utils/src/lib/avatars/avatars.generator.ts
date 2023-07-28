import { AvatarSettings } from '@wrapup/api-interfaces';
import { faker } from '@faker-js/faker';

export const generateFakeAvatar = (
  defaults?: Partial<AvatarSettings>,
): AvatarSettings => {
  return {
    angle: faker.datatype.number(),
    colors: [
      faker.color.rgb({ prefix: '#' }),
      faker.color.rgb({ prefix: '#' }),
      faker.color.rgb({ prefix: '#' }),
    ],
    ...defaults,
  };
};
