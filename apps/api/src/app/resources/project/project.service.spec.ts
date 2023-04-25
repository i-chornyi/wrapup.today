import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Repository } from 'typeorm';
import { WrapupService } from '../wrapup/wrapup.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let projectRepository: Repository<ProjectEntity>;
  const projectRepositoryToken = getRepositoryToken(ProjectEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: projectRepositoryToken,
          useValue: {
            save: jest.fn().mockImplementation((dto: CreateProjectDto) => ({
              id: 'a',
              ...dto,
            })),
            create: jest
              .fn()
              .mockImplementation(
                (dto: CreateProjectDto) => dto as ProjectEntity,
              ),
          },
        },
        {
          provide: WrapupService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    projectRepository = module.get<Repository<ProjectEntity>>(
      projectRepositoryToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a project', () => {
    const dto = { name: 'First' };

    const projectRepositoryCreateSpy = jest.spyOn(projectRepository, 'create');
    const projectRepositorySaveSpy = jest.spyOn(projectRepository, 'save');

    expect(service.create(dto)).toEqual({
      id: expect.any(String),
      name: 'First',
    });

    expect(projectRepositoryCreateSpy).toHaveBeenCalledWith(dto);
    expect(projectRepositoryCreateSpy).toHaveBeenCalledTimes(1);

    expect(projectRepositorySaveSpy).toHaveBeenCalledWith(dto as ProjectEntity);
    expect(projectRepositorySaveSpy).toHaveBeenCalledTimes(1);
  });
});
