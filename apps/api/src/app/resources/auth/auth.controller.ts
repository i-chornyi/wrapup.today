import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GoogleAuthGuard } from './google-auth.guard';
import {
  clearTokenCookies,
  getCsrfTokenMaxAge,
  setAccessAndRefreshTokensToCookies,
  setCsrfTokenToCookies,
} from './utils/cookies.util';
import { CsrfInterceptor } from '../../interceptors/csrf.interceptor';
import { generateCsrfToken } from './utils/csrf-token.util';
import { CsrfToken } from '@wrapup/api-interfaces';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(CsrfInterceptor)
  async login(@Req() req, @Res() res: Response) {
    const tokens = await this.authService.login(req.user);

    setAccessAndRefreshTokensToCookies(res, tokens);
    setCsrfTokenToCookies(res, tokens.csrfToken);

    res.send(tokens.csrfToken);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const tokens = await this.authService.googleLogin(req);

    setAccessAndRefreshTokensToCookies(res, tokens);
    setCsrfTokenToCookies(res, tokens.csrfToken);

    res.redirect(process.env.CLIENT_LOGIN_SUCCESS_URL);
  }

  @Get('csrf-token')
  async getCsrfToken(@Req() req, @Res() res: Response) {
    const tokenResponse: CsrfToken = {
      csrfToken: generateCsrfToken(),
      maxAge: getCsrfTokenMaxAge(),
    };

    setCsrfTokenToCookies(res, tokenResponse);

    res.send(tokenResponse);
  }

  @Post('logout')
  async logOut(@Req() req, @Res() res: Response) {
    const tokenResponse = {
      csrfToken: generateCsrfToken(),
      maxAge: getCsrfTokenMaxAge(),
    };

    setCsrfTokenToCookies(res, tokenResponse);

    clearTokenCookies(res);

    res.send(tokenResponse);
  }
}
