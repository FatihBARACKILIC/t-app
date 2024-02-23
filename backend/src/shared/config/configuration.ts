import { readFileSync } from 'fs';
import * as path from 'path';

export default () => {
  return {
    port: Number(process.env.PORT ?? 4000),
    jwt: {
      algorithm: process.env.JWT_ALGORITHM ?? 'RS256',
      // 15 min
      accessExpiresIn: Math.floor(Date.now() / 1000) + 15 * 60,
      accessPrivate:
        readFileSync(generateKeyPath('access_private'), {
          encoding: 'utf-8',
        }) ?? 'YOUR_PRIVATE_ACCESS_KEY',
      accessPublic:
        readFileSync(generateKeyPath('access_public'), {
          encoding: 'utf-8',
        }) ?? 'YOUR_PUBLIC_ACCESS_KEY',
      // 1 year
      refreshExpiresIn: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
      refreshPrivate:
        readFileSync(generateKeyPath('refresh_private'), {
          encoding: 'utf-8',
        }) ?? 'YOUR_PRIVATE_REFRESH_KEY',
      refreshPublic:
        readFileSync(generateKeyPath('refresh_public'), {
          encoding: 'utf-8',
        }) ?? 'YOUR_PUBLIC_REFRESH_KEY',
    },
  };
};

function generateKeyPath(keyName: string): string {
  return path.join(__dirname, `../../keys/${keyName}.pem`);
}
