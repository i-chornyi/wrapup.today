import { TestBed } from '@angular/core/testing';

import { RefreshTokenInterceptor } from './refresh-token.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RefreshTokenInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [RefreshTokenInterceptor],
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const interceptor: RefreshTokenInterceptor = TestBed.inject(
      RefreshTokenInterceptor,
    );
    expect(interceptor).toBeTruthy();
  });
});
