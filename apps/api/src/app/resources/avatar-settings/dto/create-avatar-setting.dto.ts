import { UserEntity } from '@wrapup/db-entities';
import { IsNotEmpty } from 'class-validator';

export class CreateAvatarSettingDto {
  @IsNotEmpty()
  userId: UserEntity['id'];
}
