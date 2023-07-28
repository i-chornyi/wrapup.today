import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  getIsRequiredMessage,
  getIsStringMessage,
  getMaxLengthMessage,
} from '../../../utils/validation-messages.util';
import {
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
} from '@wrapup/common-constants';

export class UpdateUserDto {
  @MaxLength(FIRST_NAME_MAX_LENGTH, {
    message: getMaxLengthMessage(FIRST_NAME_MAX_LENGTH, 'First name'),
  })
  @IsString({ message: getIsStringMessage('First name') })
  @IsNotEmpty({ message: getIsRequiredMessage('First name') })
  firstName: string;

  @IsOptional()
  @MaxLength(LAST_NAME_MAX_LENGTH, {
    message: getMaxLengthMessage(LAST_NAME_MAX_LENGTH, 'Last name'),
  })
  @IsString({ message: getIsStringMessage('Last name') })
  lastName: string;
}
