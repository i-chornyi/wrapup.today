import * as supertest from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { createTestingModule, DB_CONFIG } from '../application-builder';
import {
  ACCESS_TOKEN_COOKIE_KEY,
  CSRF_COOKIE_KEY,
  CSRF_HEADER_KEY,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  REFRESH_TOKEN_COOKIE_KEY,
} from '@wrapup/common-constants';
import {
  createTestDbConnection,
  generateFakeAvatar,
  generateFakeDataForUserCreation,
} from '@wrapup/test-utils';
import { AuthService } from '../../src/app/resources/auth/auth.service';
import {
  getInvalidEmailMessage,
  getIsRequiredMessage,
  getIsStringMessage,
  getMaxLengthMessage,
} from '../../src/app/utils/validation-messages.util';
import { AvatarSeedService, UserSeedService } from '@wrapup/seeder-services';
import {
  AvatarSettings,
  TokensResponse,
  UserCreation,
} from '@wrapup/api-interfaces';

describe('UserController', () => {
  let appFixture: INestApplication;
  let app: supertest.SuperTest<supertest.Test>;

  let tokens: TokensResponse;
  let newUser: UserCreation;
  let avatar: AvatarSettings;

  let userSeedService: UserSeedService;
  let authService: AuthService;
  let avatarSeedService: AvatarSeedService;

  beforeAll(async () => {
    appFixture = await createTestingModule();
    app = supertest(appFixture.getHttpServer());

    const dbConnection = await createTestDbConnection(DB_CONFIG);

    userSeedService = new UserSeedService(dbConnection);
    avatarSeedService = new AvatarSeedService(dbConnection);

    authService = appFixture.get<AuthService>(AuthService);

    newUser = generateFakeDataForUserCreation();
    avatar = generateFakeAvatar();
    const seededUser = (await userSeedService.seedData([newUser]))[0];
    await avatarSeedService.seedData([
      {
        ...avatar,
        user: seededUser,
      },
    ]);
    tokens = await authService.login(seededUser);
  });

  describe('/users/profile (GET)', () => {
    it('should return user profile data', async () => {
      const cookies = `${CSRF_COOKIE_KEY}=${tokens.csrfToken.csrfToken};${ACCESS_TOKEN_COOKIE_KEY}=${tokens.accessToken};${REFRESH_TOKEN_COOKIE_KEY}=${tokens.refreshToken}`;

      return app
        .get('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.email).toBe(newUser.email);
          expect(res.body.avatar.angle).toBe(avatar.angle);
          expect(res.body.avatar.colors).toEqual(avatar.colors);
        });
    });

    it('should return 401 if no access token is provided', async () => {
      const cookies = `${CSRF_COOKIE_KEY}=${tokens.csrfToken.csrfToken};${REFRESH_TOKEN_COOKIE_KEY}=${tokens.refreshToken}`;

      return app
        .get('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .expect(HttpStatus.UNAUTHORIZED)
        .expect((res) => {
          expect(res.body.reason).toBe('token_expired');
        });
    });

    it('should return 401 if no refresh token is provided', async () => {
      const cookies = `${CSRF_COOKIE_KEY}=${tokens.csrfToken.csrfToken};${ACCESS_TOKEN_COOKIE_KEY}=${tokens.accessToken}`;

      return app
        .get('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/users/profile (PUT)', () => {
    it('should update user profile data', async () => {
      const cookies = `${CSRF_COOKIE_KEY}=${tokens.csrfToken.csrfToken};${ACCESS_TOKEN_COOKIE_KEY}=${tokens.accessToken};${REFRESH_TOKEN_COOKIE_KEY}=${tokens.refreshToken}`;

      await app
        .put('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send({
          firstName: 'John',
          lastName: 'Doe Jr',
        })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.result).toBe('ok');
          expect(res.body.message).toBe(
            'User profile was successfully updated.',
          );
        });

      await app
        .get('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.firstName).toBe('John');
          expect(res.body.lastName).toBe('Doe Jr');
        });

      await app
        .put('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send({
          firstName: 'John',
          lastName: '',
        })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.result).toBe('ok');
          expect(res.body.message).toBe(
            'User profile was successfully updated.',
          );
        });

      await app
        .get('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.firstName).toBe('John');
          expect(res.body.lastName).toBe('');
        });
    });

    it('should fail updating user profile if invalid DTO is provided', async () => {
      const cookies = `${CSRF_COOKIE_KEY}=${tokens.csrfToken.csrfToken};${ACCESS_TOKEN_COOKIE_KEY}=${tokens.accessToken};${REFRESH_TOKEN_COOKIE_KEY}=${tokens.refreshToken}`;

      /** No first name */
      await app
        .put('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send({
          lastName: 'Doe III',
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body.message).toEqual([
            getIsRequiredMessage('First name'),
          ]);
        });

      /** Empty first name */
      await app
        .put('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send({
          firstName: '',
          lastName: 'Doe IV',
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body.message).toEqual([
            getIsRequiredMessage('First name'),
          ]);
        });

      /** Too long first name */
      await app
        .put('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send({
          firstName:
            'kjgnerkgn ergnjerkgn erjlngelrjngkejnl wnvlsknvkjrenb kvjrengwenfwenjkfj nwekfjn wkenfj erjlngelrjngkejnl',
          lastName: 'Doe',
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body.message).toEqual([
            getMaxLengthMessage(FIRST_NAME_MAX_LENGTH, 'First name'),
          ]);
        });

      /** Too long last name */
      await app
        .put('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send({
          firstName: 'John',
          lastName:
            'kjgnerkgn ergnjerkgn erjlngelrjngkejnl wnvlsknvkjrenb kvjrengwenfwenjkfj nwekfjn wkenfj erjlngelrjngkejnl',
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body.message).toEqual([
            getMaxLengthMessage(LAST_NAME_MAX_LENGTH, 'Last name'),
          ]);
        });

      /** Not string first name */
      await app
        .put('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send({
          firstName: 1,
          lastName: 'Doe Jr',
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body.message).toEqual([getIsStringMessage('First name')]);
        });

      /** Not string last name */
      await app
        .put('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send({
          firstName: 'Joseph',
          lastName: 2,
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body.message).toEqual([getIsStringMessage('Last name')]);
        });
    });

    it('should return 401 if no access token is provided', async () => {
      const cookies = `${CSRF_COOKIE_KEY}=${tokens.csrfToken.csrfToken};${REFRESH_TOKEN_COOKIE_KEY}=${tokens.refreshToken}`;

      return app
        .put('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send({
          firstName: 'John',
          lastName: 'Doe Jr',
        })
        .expect(HttpStatus.UNAUTHORIZED)
        .expect((res) => {
          expect(res.body.reason).toBe('token_expired');
        });
    });

    it('should return 401 if no refresh token is provided', async () => {
      const cookies = `${CSRF_COOKIE_KEY}=${tokens.csrfToken.csrfToken};${ACCESS_TOKEN_COOKIE_KEY}=${tokens.accessToken}`;

      return app
        .put('/api/v1/users/profile')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send({
          firstName: 'John',
          lastName: 'Doe Jr',
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/users [POST]', () => {
    it('should create a user', async () => {
      const userToRegister = generateFakeDataForUserCreation();

      const cookies = `${CSRF_COOKIE_KEY}=${tokens.csrfToken.csrfToken}`;

      await app
        .post('/api/v1/users')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send(userToRegister)
        .expect(HttpStatus.CREATED)
        .expect(
          'set-cookie',
          /access_token=.+; Max-Age=1200; Path=\/; Expires=.+; HttpOnly; Secure/,
        )
        .expect(
          'set-cookie',
          /refresh_token=.+; Max-Age=604800; Path=\/; Expires=.+; HttpOnly; Secure/,
        )
        .expect((res) => {
          expect(res.body.email).toBe(userToRegister.email);
        });
    });

    it('should not create a user if invalid credentials are passed', async () => {
      const cookies = `${CSRF_COOKIE_KEY}=${tokens.csrfToken.csrfToken}`;

      /** Bad e-mail format */
      const userBadEmailFormat = generateFakeDataForUserCreation({
        email: 'bademail',
      });

      await app
        .post('/api/v1/users')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send(userBadEmailFormat)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body.message).toEqual([getInvalidEmailMessage()]);
        });

      /** No e-mail */
      const userNoEmail = generateFakeDataForUserCreation({
        email: undefined,
      });

      await app
        .post('/api/v1/users')
        .set('Cookie', [cookies])
        .set(CSRF_HEADER_KEY, tokens.csrfToken.csrfToken)
        .send(userNoEmail)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body.message).toEqual([getIsRequiredMessage('E-mail')]);
        });
    });
  });

  afterAll(async () => {
    appFixture.close();
  });
});
