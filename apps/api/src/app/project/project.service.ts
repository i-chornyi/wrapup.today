import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(newProject);
  }

  findOne(id: ProjectEntity['id']) {
    return this.projectsRepository.findOneOrFail({ where: { id } });
  }

  update(id: ProjectEntity['id'], updateProjectDto: UpdateProjectDto) {
    return this.projectsRepository.update(id, updateProjectDto);
  }

  remove(id: ProjectEntity['id']) {
    return this.projectsRepository.delete({ id });
  }
}
