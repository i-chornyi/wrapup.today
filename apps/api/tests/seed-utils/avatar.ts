import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AvatarSettingEntity } from '../../src/app/resources/avatar-settings/entities/avatar-setting.entity';
import { SeedService } from '../interfaces/seed-service';

@Injectable()
export class AvatarSeedService implements SeedService {
  constructor(private dataSource: DataSource) {}

  seedFakeAvatar(
    avatarData: Partial<AvatarSettingEntity>,
  ): Promise<AvatarSettingEntity> {
    const avatarRepository = this.dataSource.getRepository(AvatarSettingEntity);

    return avatarRepository.save(avatarData);
  }

  cleanUpDatabaseTable() {
    const avatarRepository = this.dataSource.getRepository(AvatarSettingEntity);

    return avatarRepository.createQueryBuilder().delete().execute();
  }
}
