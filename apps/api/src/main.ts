import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { setupNestApp } from './application-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupNestApp(app);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();
