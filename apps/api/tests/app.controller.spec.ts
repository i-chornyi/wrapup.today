import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingModule } from './application-builder';

describe('AppController', () => {
  let testApp: INestApplication;

  beforeAll(async () => {
    testApp = await createTestingModule();
  });

  describe('/health (GET)', () => {
    it('should return ok', async () => {
      const app = supertest(testApp.getHttpServer());

      return app.get('/api/health').expect(200).expect('ok');
    });
  });

  afterAll(() => {
    testApp.close();
  });
});
