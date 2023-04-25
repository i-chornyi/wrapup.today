import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { WrapupService } from '../wrapup/wrapup.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,
    @Inject(forwardRef(() => WrapupService))
    private wrapupService: WrapupService,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(newProject);
  }

  async findOne(id: ProjectEntity['id']) {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Project with such ID is not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return project;
  }

  getProjectWrapupsByDay(projectId: ProjectEntity['id'], day: string) {
    return this.wrapupService.getWrapupsByProjectAndDay(projectId, day);
  }

  update(id: ProjectEntity['id'], updateProjectDto: UpdateProjectDto) {
    return this.projectsRepository.update(id, updateProjectDto);
  }

  remove(id: ProjectEntity['id']) {
    return this.projectsRepository.delete({ id });
  }
}
