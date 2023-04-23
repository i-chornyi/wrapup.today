import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { RefreshTokenGuard } from '../refresh-token.guard';
import { Request, Response } from 'express';
import {
  clearCsrfTokenCookie,
  clearTokenCookies,
  getCsrfTokenMaxAge,
  retrieveAccessAndRefreshTokensFromCookies,
  setAccessAndRefreshTokensToCookies,
  setCsrfTokenToCookies,
} from '../utils/cookies.util';
import { generateCsrfToken } from '../utils/csrf-token.util';

@Controller({ path: 'token', version: '1' })
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Get('check')
  @UseGuards(JwtAuthGuard)
  checkAccessToken() {
    return { result: 'ok' };
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshAccessToken(@Req() request: Request, @Res() response: Response) {
    const { refreshToken } = retrieveAccessAndRefreshTokensFromCookies(request);

    const tokens = await this.refreshTokenService.refreshAccessToken(
      refreshToken,
    );

    if (tokens) {
      const csrfToken = {
        csrfToken: generateCsrfToken(),
        maxAge: getCsrfTokenMaxAge(),
      };

      setAccessAndRefreshTokensToCookies(response, tokens);
      setCsrfTokenToCookies(response, csrfToken);

      response.send(csrfToken);
    } else {
      clearTokenCookies(response);

      throw new UnauthorizedException();
    }
  }
}
