import { HeadersInterceptor } from './headers.interceptor';
import { Test, TestingModule } from '@nestjs/testing';
import { CallHandler, ExecutionContext } from '@nestjs/common';

describe('HeadersInterceptor', () => {
  it('should be defined', () => {
    expect(new HeadersInterceptor()).toBeDefined();
  });

  let interceptor: HeadersInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadersInterceptor],
    }).compile();

    interceptor = module.get<HeadersInterceptor>(HeadersInterceptor);
  });

  it('should set the Access-Control-Allow-Origin header to *', () => {
    const request = {};
    const response = {
      setHeader: jest.fn(),
    };

    process.env = {
      CLIENT_URI: 'test',
    };

    interceptor.intercept(
      {
        switchToHttp: () => ({
          getRequest: () => request,
          getResponse: () => response,
        }),
      } as ExecutionContext,
      { handle: jest.fn() } as CallHandler,
    );

    expect(response.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Origin',
      process.env.CLIENT_URI,
    );
  });
});
