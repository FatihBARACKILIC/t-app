import * as request from 'supertest';
import { req } from '../app.e2e-spec';
import { randomNumber } from '../utils/random-number';
import { TokenControl } from './token-control';

describe('Sign Up', () => {
  function generateUserData() {
    const userData = {
      firstName: `user`,
      email: `user${randomNumber()}@gmail.com`,
      username: `user${randomNumber()}`,
      phoneNumber: `555${randomNumber()}`,
      password: 'password*1As+43T',
    };
    return userData;
  }

  it('default user', async () => {
    const res: request.Response = await req.post('signup').send({
      firstName: `user`,
      email: `user@gmail.com`,
      username: `user`,
      phoneNumber: `5555554444`,
      password: 'password*1As+43T',
    });
    expect([201, 400]).toContain(res.status);

    const res1: request.Response = await req.post('signup').send({
      firstName: `user`,
      email: `user1@gmail.com`,
      username: `user1`,
      phoneNumber: `5555554441`,
      password: 'password*1As+43T',
    });
    expect([201, 400]).toContain(res1.status);
  });

  it('should create a new user', async () => {
    const userData = generateUserData();
    const res: request.Response = await req.post('signup').send(userData);
    expect(res.statusCode).toEqual(201);
    TokenControl.refreshTokenControl(res);
    TokenControl.accessTokenControl(res);
    return res;
  });

  it('should return 400 if username is already in use', async () => {
    const userData = generateUserData();

    const res = await req
      .post('signup')
      .send({ ...userData, username: 'username' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', '[username] is already in use');
    return res;
  });

  it('should return 400 if phoneNumber is empty', async () => {
    const userData = generateUserData();

    const res = await req.post('signup').send({ ...userData, phoneNumber: '' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.result.message).toEqual([
      'phoneNumber should not be empty',
      'phoneNumber must be a phone number',
    ]);
    return res;
  });
});
