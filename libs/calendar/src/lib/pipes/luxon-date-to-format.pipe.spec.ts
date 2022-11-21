import { LuxonDateToFormatPipe } from './luxon-date-to-format.pipe';
import { DateTime } from 'luxon';

describe('LuxonDateToFormatPipe', () => {
  let pipe: LuxonDateToFormatPipe;

  beforeEach(() => {
    pipe = new LuxonDateToFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return month full name for a given date', () => {
    expect(pipe.transform(DateTime.fromISO('2022-11-11'), 'MMMM')).toBe(
      'November',
    );
  });
});
