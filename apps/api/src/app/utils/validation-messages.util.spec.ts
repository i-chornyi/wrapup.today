import {
  getInvalidEmailMessage,
  getIsRequiredMessage,
  getIsStringMessage,
  getMaxLengthMessage,
  getMinLengthMessage,
} from './validation-messages.util';

describe('ValidationMessagesUtil', () => {
  it('should return correct message from getMaxLengthMessage()', () => {
    expect(getMaxLengthMessage(100, 'Field name')).toBe(
      'Field name cannot exceed 100 characters.',
    );
  });

  it('should return correct message from getMinLengthMessage()', () => {
    expect(getMinLengthMessage(5, 'Field name')).toBe(
      'Field name cannot be shorter than 5 characters.',
    );
  });

  it('should return correct message from getIsStringMessage()', () => {
    expect(getIsStringMessage('Field name')).toBe('Field name must be text.');
  });

  it('should return correct message from getIsRequiredMessage()', () => {
    expect(getIsRequiredMessage('Field name')).toBe('Field name is required.');
  });

  it('should return correct message from getInvalidEmailMessage()', () => {
    expect(getInvalidEmailMessage()).toBe('Invalid e-mail format.');
  });
});
