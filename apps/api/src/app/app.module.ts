import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { ProjectModule } from './resources/project/project.module';
import { WrapupModule } from './resources/wrapup/wrapup.module';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST'),
        port: +configService.get<number>('PGPORT'),
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        database: configService.get('PGDATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        useUTC: true,
      }),
      inject: [ConfigService],
    }),
    ProjectModule,
    WrapupModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
