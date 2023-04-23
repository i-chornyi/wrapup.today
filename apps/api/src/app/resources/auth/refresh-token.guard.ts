import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { retrieveAccessAndRefreshTokensFromCookies } from './utils/cookies.util';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { refreshToken } = retrieveAccessAndRefreshTokensFromCookies(request);

    return !!refreshToken;
  }
}
