import { createCipheriv, createDecipheriv } from 'node:crypto';

const ENCRYPTION_ALGO = 'aes-256-cbc';

export const encrypt = (
  valueToEncrypt: string,
  secret: string,
  ivString: string,
): string => {
  const iv = Buffer.from(ivString);

  const cipher = createCipheriv(ENCRYPTION_ALGO, secret, iv);

  let result = cipher.update(valueToEncrypt, 'utf8', 'hex');
  result += cipher.final('hex');

  return result;
};

export const decrypt = (
  encryptedText: string,
  secret: string,
  ivString: string,
): string => {
  const iv = Buffer.from(ivString);

  const decipher = createDecipheriv(ENCRYPTION_ALGO, secret, iv);

  let result = decipher.update(encryptedText, 'hex', 'utf8');
  result += decipher.final('utf8');

  return result;
};
