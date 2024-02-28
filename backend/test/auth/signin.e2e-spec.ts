import { req } from '../app.e2e-spec';
import { TokenControl } from './token-control';

describe('Sign In', () => {
  it('should sign in with valid credentials', async () => {
    const res = await req.post('signin').send({
      username: `user`,
      password: 'password*1As+43T',
    });
    expect(res.status).toEqual(200);
    TokenControl.refreshTokenControl(res);
    TokenControl.accessTokenControl(res);
    return res;
  });

  it('should not sign in with invalid credentials', async () => {
    const res = await req
      .post('signin')
      .send({ username: 'invalidUser', password: 'invalidPassword' });
    expect(res.status).toEqual(400);
    return res;
  });
});
