import { UserInitialsPipe } from './user-initials.pipe';
import { UserProfile } from '@wrapup/api-interfaces';

describe('UserInitialsPipe', () => {
  it('create an instance', () => {
    const pipe = new UserInitialsPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform the name into correct initials', () => {
    const pipe = new UserInitialsPipe();
    expect(
      pipe.transform({ firstName: 'John', lastName: 'Doe' } as UserProfile),
    ).toBe('JD');
    expect(pipe.transform({ firstName: 'John' } as UserProfile)).toBe('J');
    expect(pipe.transform({ firstName: 'sarah' } as UserProfile)).toBe('S');
    expect(pipe.transform({ lastName: 'Johnson' } as UserProfile)).toBe('J');
    expect(pipe.transform({} as UserProfile)).toBe('');
  });
});
