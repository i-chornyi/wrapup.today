import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 20 * 60 }, // 20 mins
    }),
  ],
  exports: [JwtModule],
})
export class CoreModule {}
