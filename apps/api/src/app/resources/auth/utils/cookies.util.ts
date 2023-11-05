import { Request, Response } from 'express';

import { CsrfToken, TokenPair } from '@wrapup/api-interfaces';
import {
  ACCESS_TOKEN_COOKIE_KEY,
  CSRF_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from '@wrapup/common-constants';
import { environment } from '../../../../environments/environment';

export const retrieveAccessAndRefreshTokensFromCookies = (request: Request) => {
  const accessToken = request.cookies[ACCESS_TOKEN_COOKIE_KEY];
  const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE_KEY];

  return { accessToken, refreshToken };
};

export const setAccessAndRefreshTokensToCookies = (
  response: Response,
  tokens: TokenPair,
) => {
  response.cookie(ACCESS_TOKEN_COOKIE_KEY, tokens.accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: getAccessTokenMaxAge(),
    sameSite: environment.production ? 'lax' : 'none',
  });
  response.cookie(REFRESH_TOKEN_COOKIE_KEY, tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: getRefreshTokenMaxAge(),
    sameSite: environment.production ? 'lax' : 'none',
  });
};

export const setCsrfTokenToCookies = (response: Response, token: CsrfToken) => {
  response.cookie(CSRF_COOKIE_KEY, token.csrfToken, {
    httpOnly: true,
    secure: true,
    maxAge: token.maxAge,
    sameSite: environment.production ? 'lax' : 'none',
  });
};

export const clearTokenCookies = (response: Response) => {
  response.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
  response.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
};

export const clearCsrfTokenCookie = (response: Response) => {
  response.clearCookie(CSRF_COOKIE_KEY);
};

export const getAccessTokenMaxAge = () => {
  return 1000 * 60 * 20; // 20 min
  // return 1000 * 15; // 15 sec
};

export const getRefreshTokenMaxAge = () => {
  return 1000 * 60 * 60 * 24 * 7; // 1 week
};

export const getCsrfTokenMaxAge = () => {
  return 1000 * 60 * 60 * 24 * 7; // 1 week
};
