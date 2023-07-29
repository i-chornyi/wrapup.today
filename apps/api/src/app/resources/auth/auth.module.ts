import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { RefreshTokenController } from './refresh-token/refresh-token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './refresh-token/entities/refresh-token.entity';

@Module({
  controllers: [AuthController, RefreshTokenController],
  imports: [
    PassportModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([RefreshTokenEntity]),
  ],
  providers: [
    AuthService,
    RefreshTokenService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
  ],
  exports: [AuthService, RefreshTokenService, TypeOrmModule],
})
export class AuthModule {}
