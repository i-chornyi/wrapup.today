import { ProjectEntity } from '../../project/entities/project.entity';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateWrapupDto {
  @IsUUID()
  @IsNotEmpty()
  projectId: ProjectEntity['id'];

  @IsString()
  @IsNotEmpty()
  done: string;

  @IsString()
  @IsNotEmpty()
  planned: string;

  @IsString()
  @IsNotEmpty()
  blockers: string;

  @IsDateString()
  @IsNotEmpty()
  day: string;
}
