import * as crypto from 'crypto';

export function generateUserNameIfNotExist(username?: string): string {
  return username ?? 'CUD' + crypto.randomUUID().replaceAll('-', '');
}
