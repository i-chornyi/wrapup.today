import { UserNamePipe } from './user-name.pipe';
import { UserProfile } from '@wrapup/api-interfaces';

describe('UserNamePipe', () => {
  it('create an instance', () => {
    const pipe = new UserNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('transform the name into correct text to display', () => {
    const pipe = new UserNamePipe();
    expect(
      pipe.transform({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@mail.com',
      } as UserProfile),
    ).toBe('John Doe');
    expect(pipe.transform({ firstName: 'John' } as UserProfile)).toBe('John');
    expect(
      pipe.transform({
        lastName: 'Doe',
        email: 'john.doe@mail.com',
      } as UserProfile),
    ).toBe('john.doe@mail.com');
    expect(pipe.transform({ email: 'john.doe@mail.com' } as UserProfile)).toBe(
      'john.doe@mail.com',
    );
    expect(pipe.transform({} as UserProfile)).toBeUndefined();
  });
});
