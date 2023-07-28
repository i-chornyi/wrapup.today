import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  getInvalidEmailMessage,
  getIsRequiredMessage,
  getIsStringMessage,
  getMaxLengthMessage,
  getMinLengthMessage,
} from '../../../utils/validation-messages.util';
import {
  EMAIL_MAX_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@wrapup/common-constants';

export class CreateUserByEmailAndPasswordDto {
  @MaxLength(EMAIL_MAX_LENGTH, {
    message: getMaxLengthMessage(EMAIL_MAX_LENGTH, 'E-mail'),
  })
  @IsEmail({}, { message: getInvalidEmailMessage() })
  @IsNotEmpty({ message: getIsRequiredMessage('E-mail') })
  email: string;

  @MinLength(PASSWORD_MIN_LENGTH, {
    message: getMinLengthMessage(PASSWORD_MIN_LENGTH, 'Password'),
  })
  @IsNotEmpty({ message: getIsRequiredMessage('Password') })
  password: string;
}

export class CreateUserByGoogleDataDto {
  @IsString()
  @IsNotEmpty({ message: getIsRequiredMessage('ID') })
  id: string;

  @MaxLength(EMAIL_MAX_LENGTH, {
    message: getMaxLengthMessage(EMAIL_MAX_LENGTH, 'E-mail'),
  })
  @IsEmail({}, { message: getInvalidEmailMessage() })
  @IsNotEmpty({ message: getIsRequiredMessage('E-mail') })
  email: string;

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
