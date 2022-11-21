import { HasSamePipe } from './has-same.pipe';
import { DateTime } from 'luxon';

describe('HasSamePipe', () => {
  let pipe: HasSamePipe;

  beforeEach(() => {
    pipe = new HasSamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for the same date', () => {
    expect(
      pipe.transform(
        DateTime.fromISO('2020-10-15T09:00:00'),
        DateTime.fromISO('2020-10-15T10:00:00'),
        'day',
      ),
    ).toBe(true);
  });

  it('should return false for the different date', () => {
    expect(
      pipe.transform(
        DateTime.fromISO('2020-10-13T09:00:00'),
        DateTime.fromISO('2020-10-15T10:00:00'),
        'day',
      ),
    ).toBe(false);
  });
});
