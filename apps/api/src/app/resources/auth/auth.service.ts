import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { compareSync } from 'bcryptjs';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { TokensResponse } from '@wrapup/api-interfaces';
import { getCsrfTokenMaxAge } from './utils/cookies.util';
import { generateCsrfToken } from './utils/csrf-token.util';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private usersService: UserService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Pick<UserEntity, 'id' | 'email'>): Promise<TokensResponse> {
    const authTokens =
      await this.refreshTokenService.generateAccessAndRefreshTokens(user);
    const csrfToken = generateCsrfToken();

    return {
      csrfToken: {
        csrfToken,
        maxAge: getCsrfTokenMaxAge(),
      },
      accessToken: authTokens.accessToken,
      refreshToken: authTokens.refreshToken,
    };
  }

  async googleLogin(req): Promise<TokensResponse> {
    if (!req.user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: "User wasn't found",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const user: UserEntity = await this.usersService.findOneByEmail(
        req.user.email,
      );

      if (!user) {
        throw new Error('No user found');
      }

      return this.login(user);
    } catch (error) {
      const newUser: UserEntity =
        await this.usersService.createUserByGoogleData(req.user);

      return this.login(newUser);
    }
  }
}
