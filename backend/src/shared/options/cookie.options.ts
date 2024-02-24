import { CookieOptions } from 'express';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  signed: true,
};

export function cookieOptionsWithExpires(day: number): CookieOptions {
  const date = new Date();
  const cookieWithExpiresOptions: CookieOptions = {
    ...cookieOptions,
    expires: new Date(date.setDate(date.getDate() + day)),
  };
  return cookieWithExpiresOptions;
}
