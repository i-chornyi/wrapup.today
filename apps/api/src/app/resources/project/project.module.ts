import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectEntity } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WrapupModule } from '../wrapup/wrapup.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    forwardRef(() => WrapupModule),
    AuthModule,
    UserModule,
  ],
  exports: [TypeOrmModule, ProjectService],
})
export class ProjectModule {}
