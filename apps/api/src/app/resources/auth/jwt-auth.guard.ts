import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { retrieveAccessAndRefreshTokensFromCookies } from './utils/cookies.util';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { accessToken, refreshToken } =
      retrieveAccessAndRefreshTokensFromCookies(request);

    if (!refreshToken) {
      throw new HttpException({}, HttpStatus.UNAUTHORIZED);
    }

    if (!accessToken) {
      throw new HttpException(
        { reason: 'token_expired' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      this.jwtService.verify(accessToken);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException(
          { reason: 'token_expired' },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return false;
    }

    return this.activate(context);
  }

  async activate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }
}
