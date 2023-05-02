import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingModule } from '../application-builder';
import {
  generateFakeUser,
  seedFakeUser,
} from '../fake-data-generators/users.generator';
import { CSRF_COOKIE_KEY, CSRF_HEADER_KEY } from '@wrapup/common-constants';
import { UserService } from '../../src/app/resources/user/user.service';
import { generateCsrfToken } from '../../src/app/resources/auth/utils/csrf-token.util';

describe('AuthController', () => {
  let testApp: INestApplication;

  beforeAll(async () => {
    testApp = await createTestingModule();
  });

  describe('/login (POST)', () => {
    it('should successfully login and return csrf token', async () => {
      const newUser = generateFakeUser();

      await seedFakeUser(newUser, testApp.get(UserService));

      const app = supertest(testApp.getHttpServer());

      const csrfToken = generateCsrfToken();

      return app
        .post('/api/v1/auth/login')
        .set('Cookie', [`${CSRF_COOKIE_KEY}=${csrfToken}`])
        .set(CSRF_HEADER_KEY, csrfToken)
        .send(newUser)
        .expect(201)
        .expect(
          'set-cookie',
          /access_token=.+; Max-Age=1200; Path=\/; Expires=.+; HttpOnly; Secure/,
        )
        .expect(
          'set-cookie',
          /refresh_token=.+; Max-Age=604800; Path=\/; Expires=.+; HttpOnly; Secure/,
        )
        .expect(
          'set-cookie',
          /csrf_token=.+; Max-Age=604800; Path=\/; Expires=.+; HttpOnly; Secure/,
        )
        .expect((res) => {
          expect(res.body).toEqual({
            csrfToken: expect.any(String),
            maxAge: expect.any(Number),
          });
        });
    });

    it('should return 401 for bad login credentials', async () => {
      const newUser = generateFakeUser();

      const app = supertest(testApp.getHttpServer());

      const csrfToken = generateCsrfToken();

      return app
        .post('/api/v1/auth/login')
        .set('Cookie', [`${CSRF_COOKIE_KEY}=${csrfToken}`])
        .set(CSRF_HEADER_KEY, csrfToken)
        .send(newUser)
        .expect(401)
        .expect((res) =>
          expect(res.body.message).toBe('E-mail or password is not correct'),
        );
    });
  });

  describe('/google/redirect (GET)', () => {
    it('should successfully login with google data and return csrf token', async () => {
      const app = supertest(testApp.getHttpServer());

      return app.get('/api/v1/auth/google/redirect').expect(302);
    });
  });

  describe('/csrf-token (GET)', () => {
    it('should return a csrf token', () => {
      const app = supertest(testApp.getHttpServer());

      return app
        .get('/api/v1/auth/csrf-token')
        .expect(200)
        .expect(
          'set-cookie',
          /csrf_token=.+; Max-Age=604800; Path=\/; Expires=.+; HttpOnly; Secure/,
        )
        .expect((res) =>
          expect(res.body).toEqual({
            csrfToken: expect.any(String),
            maxAge: expect.any(Number),
          }),
        );
    });
  });

  afterAll(() => {
    testApp.close();
  });
});
