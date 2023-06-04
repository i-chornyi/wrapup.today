import { PartialType } from '@nestjs/mapped-types';
import { CreateAvatarSettingDto } from './create-avatar-setting.dto';

export class UpdateAvatarSettingDto extends PartialType(
  CreateAvatarSettingDto,
) {}
