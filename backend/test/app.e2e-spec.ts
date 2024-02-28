import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

export const req = request('http://localhost:4001/');

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Hello World', async () => {
    const res: request.Response = await req.get('');
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toContain('Hello, World!');
    return res;
  });

  afterAll(async () => {
    await app.close();
  });
});
