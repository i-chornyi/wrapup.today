import { TestBed } from '@angular/core/testing';

import { WrapupService } from './wrapup.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WrapupService', () => {
  let service: WrapupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WrapupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
