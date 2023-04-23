import { forwardRef, Module } from '@nestjs/common';
import { WrapupService } from './wrapup.service';
import { WrapupController } from './wrapup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WrapupEntity } from './entities/wrapup.entity';
import { ProjectModule } from '../project/project.module';

@Module({
  controllers: [WrapupController],
  providers: [WrapupService],
  imports: [
    TypeOrmModule.forFeature([WrapupEntity]),
    forwardRef(() => ProjectModule),
  ],
  exports: [TypeOrmModule, WrapupService],
})
export class WrapupModule {}
