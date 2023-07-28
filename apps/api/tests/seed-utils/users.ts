import { UserCreation, UserProfile } from '@wrapup/api-interfaces';
import { UserService } from '../../src/app/resources/user/user.service';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../src/app/resources/user/entities/user.entity';
import { SeedService } from '../interfaces/seed-service';

export const seedFakeUser = async (
  user: UserCreation,
  service: UserService,
) => {
  return await service.createUserByEmailAndPassword(user);
};

@Injectable()
export class UserSeedService implements SeedService {
  constructor(private dataSource: DataSource) {}

  seedFakeUser(userData: Partial<UserProfile>): Promise<UserEntity> {
    const userRepository = this.dataSource.getRepository(UserEntity);

    return userRepository.save(userData);
  }

  cleanUpDatabaseTable() {
    const userRepository = this.dataSource.getRepository(UserEntity);

    return userRepository.createQueryBuilder().delete().execute();
  }
}
