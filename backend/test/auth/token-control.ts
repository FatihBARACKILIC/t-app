import * as request from 'supertest';

export class TokenControl {
  static refreshTokenControl(res: request.Response): string {
    expect(res.headers['set-cookie']).toBeDefined();
    const cookies = res.get('Set-Cookie')[0].split('; ');
    const refreshToken = cookies.filter((cookie) =>
      cookie.startsWith('refresh_token'),
    );
    expect(refreshToken.length).toBe(1);

    return res.get('Set-Cookie')[0];
  }
  static accessTokenControl(res: request.Response): string {
    expect(res.headers['authorization']).toBeDefined();
    return res.headers['authorization'].split(' ')[1];
  }
}
