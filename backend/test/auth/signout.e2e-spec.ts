import { req } from '../app.e2e-spec';
import { TokenControl } from './token-control';

describe('Sign Out', () => {
  it('should sign out with valid credentials', async () => {
    const res = await req.post('signin').send({
      username: `user`,
      password: 'password*1As+43T',
    });
    expect(res.status).toEqual(200);
    const refresh_token = TokenControl.refreshTokenControl(res);
    const access_token = TokenControl.accessTokenControl(res);
    req
      .post('signout')
      .set('Authorization', `Bearer ${access_token}`)
      .set('Cookie', `${refresh_token}; HttpOnly; Secure`)
      .expect(200);
  });
});
