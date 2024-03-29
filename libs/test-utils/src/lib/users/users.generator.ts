import { UserCreation, UserProfile } from '@wrapup/api-interfaces';
import { faker } from '@faker-js/faker';
import { generateFakeAvatar } from '../avatars/avatars.generator';

export const generateFakeDataForUserCreation = (
  defaults?: Partial<UserCreation>,
): UserCreation => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...defaults,
  };
};

export const generateFakeUserProfile = (
  defaults?: Partial<UserProfile>,
): UserProfile => {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: generateFakeAvatar(),
    isProfileComplete: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    ...defaults,
  };
};
