import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import {
  AvatarSettingEntity,
  ProjectEntity,
  RefreshTokenEntity,
  UserEntity,
  WrapupEntity,
} from '@wrapup/db-entities';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { setupNestApp } from '../src/application-builder';

export const DB_CONFIG: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  entities: [
    UserEntity,
    ProjectEntity,
    RefreshTokenEntity,
    AvatarSettingEntity,
    WrapupEntity,
  ],
};

class MockMailerService {
  async sendMail(options: ISendMailOptions): Promise<void> {
    // Do nothing in the mock implementation
  }

  async sendUserConfirmation(userEntity: UserEntity) {
    // Do nothing
  }
}

export async function createTestingModule() {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule, TypeOrmModule.forRoot(DB_CONFIG)],
  })
    .overrideProvider(MailerService)
    .useClass(MockMailerService)
    .compile();

  const app = moduleRef.createNestApplication();

  setupNestApp(app);

  await app.init();

  return app;
}
