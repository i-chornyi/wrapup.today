import { PartialType } from '@nestjs/mapped-types';
import { CreateUserByEmailAndPasswordDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  CreateUserByEmailAndPasswordDto,
) {}
