import { UserCreation } from '@wrapup/api-interfaces';
import { UserService } from '../../src/app/resources/user/user.service';

export const seedFakeUser = async (
  user: UserCreation,
  service: UserService,
) => {
  await service.createUserByEmailAndPassword(user);
};
