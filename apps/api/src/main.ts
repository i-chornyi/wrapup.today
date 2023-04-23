import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { HeadersInterceptor } from './app/interceptors/headers.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const globalPrefix = 'api';
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
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new HeadersInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
