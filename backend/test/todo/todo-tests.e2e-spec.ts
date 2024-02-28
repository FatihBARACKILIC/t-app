import { TokenControl } from '../auth/token-control';
import { req } from '../app.e2e-spec';

describe('Todo Tests', () => {
  let refresh_token = '';
  let access_token = '';
  let todoId = '';

  beforeAll(async () => {
    const res = await req.post('signin').send({
      username: `user`,
      password: 'password*1As+43T',
    });
    expect(res.status).toEqual(200);
    refresh_token = TokenControl.refreshTokenControl(res);
    access_token = TokenControl.accessTokenControl(res);
  });

  it('create todo', async () => {
    const res = await req
      .post('todo')
      .set('Authorization', `Bearer ${access_token}`)
      .set('Cookie', refresh_token)
      .send({ title: 'title deneme' });

    expect(res.status).toEqual(201);
  });

  it('get todo list', async () => {
    const res = await req
      .get('todo')
      .set('Authorization', `Bearer ${access_token}`)
      .set('Cookie', refresh_token);

    expect(res.status).toEqual(200);
    todoId = res.body.result[0].id;
  });

  it('get todo list', async () => {
    const res = await req
      .get(`todo/${todoId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .set('Cookie', refresh_token);

    expect(res.status).toEqual(200);
  });
});
