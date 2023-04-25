import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useValue: {
            create: jest.fn().mockImplementation((dto: CreateProjectDto) => ({
              id: 'a',
              ...dto,
            })),
            findOne: jest.fn().mockImplementation((id: string) => ({
              id,
              name: 'a',
            })),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a project', () => {
    const createSpy = jest.spyOn(service, 'create');
    const dto = { name: 'First' };

    expect(controller.create(dto)).toEqual({
      id: expect.any(String),
      name: 'First',
    });
    expect(createSpy).toHaveBeenCalledWith(dto);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });

  it('should find a project by ID', async () => {
    const findOneSpy = jest.spyOn(service, 'findOne');
    const badId = '1';
    const goodId = '2e4814f5-bb8d-4cb5-8e3e-ad763ec52425';

    expect(await controller.findOne(goodId)).toEqual({
      id: goodId,
      name: expect.any(String),
    });
    expect(findOneSpy).toHaveBeenCalledWith(goodId);
    expect(findOneSpy).toHaveBeenCalledTimes(1);
  });
});
