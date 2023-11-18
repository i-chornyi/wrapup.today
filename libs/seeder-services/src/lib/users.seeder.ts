import { UserProfile } from '@wrapup/api-interfaces';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@wrapup/db-entities';
import { SeedService } from './seeder-service.interface';

export class UserSeedService implements SeedService<UserEntity> {
  repository: Repository<UserEntity>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  async seedData(userData: Partial<UserProfile>[]): Promise<UserEntity[]> {
    const usersToSave = userData.map((user) => this.repository.create(user));

    const users = await this.repository.save(usersToSave);
    return users;
  }
}
