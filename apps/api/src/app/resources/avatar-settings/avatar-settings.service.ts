import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvatarSettingEntity, UserEntity } from '@wrapup/db-entities';
import { UserService } from '../user/user.service';
import { generateAvatarSettings } from './utils/avatar-generator.util';

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
      angle: newAvatarSettings.angle,
      colors: newAvatarSettings.colors,
      user,
    });
    return this.avatarSettingRepository.save(newAvatar);
  }

  generateAvatarEntity() {
    const newAvatarSettings = generateAvatarSettings();
    const avatar = new AvatarSettingEntity();
    avatar.angle = newAvatarSettings.angle;
    avatar.colors = newAvatarSettings.colors;

    return avatar;
  }
}
