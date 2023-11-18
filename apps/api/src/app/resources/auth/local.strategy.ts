import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { UserEntity } from '@wrapup/db-entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<
    Omit<UserEntity, 'password' | 'hashPassword' | 'isProfileComplete'>
  > {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'E-mail or password is not correct',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
