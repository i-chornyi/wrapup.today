import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { decrypt } from '../resources/auth/utils/encryption.util';
import {
  clearCsrfTokenCookie,
  clearTokenCookies,
} from '../resources/auth/utils/cookies.util';
import { Request, Response } from 'express';
import { CSRF_COOKIE_KEY, CSRF_HEADER_KEY } from '@wrapup/common-constants';

@Injectable()
export class CsrfInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    let csrfTokenFromHeader = request.headers[CSRF_HEADER_KEY];
    const csrfTokenFromCookie = request.cookies[CSRF_COOKIE_KEY];

    if (Array.isArray(csrfTokenFromHeader)) {
      csrfTokenFromHeader = csrfTokenFromHeader[0];
    }

    if (
      !csrfTokenFromHeader ||
      !csrfTokenFromCookie ||
      csrfTokenFromCookie !== csrfTokenFromHeader
    ) {
      this.failAndLogout(response);
    }

    try {
      const decryptedCsrfTokenFromCookie = decrypt(
        csrfTokenFromCookie,
        process.env.CSRF_ENCRYPTION_SECRET,
        process.env.CSRF_IV,
      );

      const decryptedCsrfTokenFromHeader = decrypt(
        csrfTokenFromHeader,
        process.env.CSRF_ENCRYPTION_SECRET,
        process.env.CSRF_IV,
      );

      if (decryptedCsrfTokenFromCookie !== decryptedCsrfTokenFromHeader) {
        this.failAndLogout(response);
      }
    } catch (e) {
      this.failAndLogout(response);
    }

    return next.handle();
  }

  failAndLogout(response: Response) {
    clearTokenCookies(response);
    clearCsrfTokenCookie(response);

    throw new HttpException('Bad CSRF token', 401);
  }
}
