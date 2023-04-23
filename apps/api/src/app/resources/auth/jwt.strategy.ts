import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AppRequest } from '@wrapup/api-interfaces';
import { retrieveAccessAndRefreshTokensFromCookies } from './utils/cookies.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const { accessToken, refreshToken } =
            retrieveAccessAndRefreshTokensFromCookies(request);

          if (!accessToken || !refreshToken) {
            return null;
          }

          return accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: AppRequest['user']) {
    return { userId: payload.userId, email: payload.email };
  }
}
