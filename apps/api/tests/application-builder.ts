import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HeadersInterceptor } from '../src/app/interceptors/headers.interceptor';
import * as cookieParser from 'cookie-parser';
import { UserSeedService } from './seed-utils/users';
import { AvatarSeedService } from './seed-utils/avatar';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '../src/app/resources/user/entities/user.entity';

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
    imports: [
      AppModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        synchronize: true,
      }),
    ],
    providers: [UserSeedService, AvatarSeedService],
  })
    .overrideProvider(MailerService)
    .useClass(MockMailerService)
    .compile();

  const app = moduleRef.createNestApplication();

  app.setGlobalPrefix('api');

  app.enableCors({
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'X-CSRF-TOKEN',
    ],
    origin: [process.env.CLIENT_URI],
  });
  app.use(cookieParser());
  app.useGlobalInterceptors(new HeadersInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.init();

  return app;
}
