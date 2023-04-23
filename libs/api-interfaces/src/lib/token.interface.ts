export type AccessToken = string;
export type RefreshToken = string;

export interface TokenPair {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}

export interface CsrfToken {
  csrfToken: string;
  maxAge: number;
}

export interface CsrfTokenFE {
  csrfToken: string;
  validUntil: string;
}

export type TokensResponse = TokenPair & { csrfToken: CsrfToken };
