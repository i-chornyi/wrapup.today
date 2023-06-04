import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { ProjectModule } from './resources/project/project.module';
import { WrapupModule } from './resources/wrapup/wrapup.module';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './resources/auth/auth.module';
import { CoreModule } from './core.module';
import { MailModule } from './resources/mail/mail.module';
import { AvatarSettingsModule } from './resources/avatar-settings/avatar-settings.module';

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
    CoreModule,
    ProjectModule,
    WrapupModule,
    UserModule,
    AuthModule,
    MailModule,
    AvatarSettingsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
