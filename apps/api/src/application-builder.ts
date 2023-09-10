import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

export const setupNestApp = (app: INestApplication) => {
  const globalPrefix = 'api';

  app.enableCors({
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'X-CSRF-TOKEN',
    ],
    origin: process.env.ALLOWED_ORIGINS.split(','),
  });
  app.use(cookieParser());
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
};
