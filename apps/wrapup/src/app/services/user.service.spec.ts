import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { generateFakeUserProfile } from '@wrapup/test-utils';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the currentUser$ when set to a new value', () => {
    const currentUserSpy = subscribeSpyTo(service.currentUser$);

    expect(currentUserSpy.getLastValue()).toBe(undefined);

    const fakeUser = generateFakeUserProfile();

    service.setCurrentUser(fakeUser);

    expect(currentUserSpy.getLastValue()).toEqual(fakeUser);
  });
});
