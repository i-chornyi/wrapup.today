import { CsrfInterceptor } from './csrf.interceptor';
import { Test, TestingModule } from '@nestjs/testing';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, NEVER, of } from 'rxjs';
import { Request, Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { CSRF_COOKIE_KEY, CSRF_HEADER_KEY } from '@wrapup/common-constants';

describe('CsrfInterceptor', () => {
  let interceptor: CsrfInterceptor;

  let request: Request;
  let response: Response;
  let context: ExecutionContext;
  let nextHandler: CallHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsrfInterceptor],
    }).compile();

    interceptor = module.get<CsrfInterceptor>(CsrfInterceptor);

    request = {
      headers: {},
      cookies: {},
    } as Request;
    response = {
      clearCookie: jest.fn(),
    } as unknown as Response;
    context = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(request),
        getResponse: jest.fn().mockReturnValue(response),
      } as unknown as HttpArgumentsHost),
    } as unknown as ExecutionContext;
    nextHandler = {
      handle: () => of(NEVER),
    };

    jest.spyOn(response, 'clearCookie');
  });

  it('should be defined', () => {
    expect(new CsrfInterceptor()).toBeDefined();
  });

  it('should validate the csrf token from header and cookie', async () => {
    request.headers = {
      [CSRF_HEADER_KEY]:
        '26ee2457b7dd669e5d68fde379263b9498b418589233be2f5333dc6e0582f7775d82f024f7ac3e5b10e6e014e3fc6e7a',
    };
    request.cookies = {
      [CSRF_COOKIE_KEY]:
        '26ee2457b7dd669e5d68fde379263b9498b418589233be2f5333dc6e0582f7775d82f024f7ac3e5b10e6e014e3fc6e7a',
    };
    console.log(request);
    await firstValueFrom(interceptor.intercept(context, nextHandler));
    expect(nextHandler.handle).toHaveBeenCalled();
    expect(response.clearCookie).not.toHaveBeenCalled();
  });
});
