import { forwardRef, Module } from '@nestjs/common';
import { AvatarSettingsService } from './avatar-settings.service';
import { AvatarSettingsController } from './avatar-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AvatarSettingEntity } from '@wrapup/db-entities';

@Module({
  controllers: [AvatarSettingsController],
  providers: [AvatarSettingsService],
  imports: [
    TypeOrmModule.forFeature([AvatarSettingEntity]),
    forwardRef(() => UserModule),
  ],
  exports: [AvatarSettingsService],
})
export class AvatarSettingsModule {}
