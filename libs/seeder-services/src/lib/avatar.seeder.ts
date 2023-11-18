import { SeedService } from './seeder-service.interface';
import { AvatarSettingEntity } from '@wrapup/db-entities';
import { DataSource, Repository } from 'typeorm';

export class AvatarSeedService implements SeedService<AvatarSettingEntity> {
  repository: Repository<AvatarSettingEntity>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(AvatarSettingEntity);
  }

  async seedData(
    avatarData: Partial<AvatarSettingEntity>[],
  ): Promise<AvatarSettingEntity[]> {
    const avatarsToSave = avatarData.map((avatar) =>
      this.repository.create(avatar),
    );

    const avatars = await this.repository.save(avatarsToSave);
    return avatars;
  }
}
