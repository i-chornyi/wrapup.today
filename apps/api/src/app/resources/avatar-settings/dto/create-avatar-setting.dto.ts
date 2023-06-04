import { UserEntity } from '../../user/entities/user.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateAvatarSettingDto {
  @IsNotEmpty()
  userId: UserEntity['id'];
}
