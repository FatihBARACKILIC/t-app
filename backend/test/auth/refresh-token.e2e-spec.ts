import { req } from '../app.e2e-spec';
import { TokenControl } from './token-control';

describe('Refresh Token', () => {
  it('should refresh token', async () => {
    const res = await req.post('signin').send({
      username: `user1`,
      password: 'password*1As+43T',
    });
    expect(res.status).toEqual(200);
    const refresh_token = TokenControl.refreshTokenControl(res);
    const access_token = TokenControl.accessTokenControl(res);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const newRes = await req
      .post('refresh-key')
      .set('Authorization', access_token)
      .set('Cookie', refresh_token);

    expect(newRes.status).toEqual(200);

    const refresh_token1 = TokenControl.refreshTokenControl(newRes);
    const access_token1 = TokenControl.accessTokenControl(newRes);

    expect(refresh_token1).not.toEqual(refresh_token);
    expect(access_token1).not.toEqual(access_token);
  });
});
