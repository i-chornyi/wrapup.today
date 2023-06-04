import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvatarSettingEntity } from './entities/avatar-setting.entity';
import { UserService } from '../user/user.service';
import { generateAvatarSettings } from './utils/avatar-generator.util';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AvatarSettingsService {
  constructor(
    @InjectRepository(AvatarSettingEntity)
    private avatarSettingRepository: Repository<AvatarSettingEntity>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async create(user: UserEntity) {
    const newAvatarSettings = generateAvatarSettings();

    const newAvatar: AvatarSettingEntity = this.avatarSettingRepository.create({
      angle: newAvatarSettings.angle.toString(),
      colors: newAvatarSettings.colors,
      user,
    });
    return this.avatarSettingRepository.save(newAvatar);
  }
}
