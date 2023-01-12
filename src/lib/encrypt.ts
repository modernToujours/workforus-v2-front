import { AES, enc } from 'crypto-js';

const secretKey = `%{NEXT_PUBLIC_CRYPTO_KEY}`;
export const encrypt = (token: string) => {
  return AES.encrypt(token, secretKey).toString();
};

export const decrypt = (encryptedToken: string) => {
  const bytes = AES.decrypt(encryptedToken, secretKey);

  return bytes.toString(enc.Utf8);
};
