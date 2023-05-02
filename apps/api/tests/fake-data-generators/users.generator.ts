import { UserCreation } from '@wrapup/api-interfaces';
import { faker } from '@faker-js/faker';
import { UserService } from '../../src/app/resources/user/user.service';

export const generateFakeUser = (
  defaults?: Partial<UserCreation>,
): UserCreation => {
  return {
    ...defaults,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const seedFakeUser = async (
  user: UserCreation,
  service: UserService,
) => {
  await service.createUserByEmailAndPassword(user);
};
