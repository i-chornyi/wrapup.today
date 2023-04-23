import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserByEmailAndPasswordDto {
  @IsEmail({}, { message: 'Invalid e-mail format' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class CreateUserByGoogleDataDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsEmail({}, { message: 'Invalid e-mail format' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
