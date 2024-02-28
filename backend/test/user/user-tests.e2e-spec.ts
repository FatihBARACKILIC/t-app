import { TokenControl } from '../auth/token-control';
import { req } from '../app.e2e-spec';
import { PublicUserType } from 'src/auth/types';

describe('User Tests', () => {
  let user: PublicUserType;
  let refresh_token = '';
  let access_token = '';

  beforeAll(async () => {
    const res = await req.post('signin').send({
      username: `user`,
      password: 'password*1As+43T',
    });
    expect(res.status).toEqual(200);
    user = res.body.result;
    refresh_token = TokenControl.refreshTokenControl(res);
    access_token = TokenControl.accessTokenControl(res);
  });

  it('get user', async () => {
    const res = await req
      .get('user/user')
      .set('Authorization', `Bearer ${access_token}`)
      .set('Cookie', refresh_token);

    expect(res.status).toEqual(200);
    expect(res.body.result.email).toEqual(user.email);
  });
});
