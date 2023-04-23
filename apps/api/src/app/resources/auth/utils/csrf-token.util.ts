import { v4 as uuid } from 'uuid';
import { encrypt } from './encryption.util';

export const generateCsrfToken = (): string => {
  const value = uuid();
  return encrypt(
    value,
    process.env.CSRF_ENCRYPTION_SECRET,
    process.env.CSRF_IV,
  );
};
