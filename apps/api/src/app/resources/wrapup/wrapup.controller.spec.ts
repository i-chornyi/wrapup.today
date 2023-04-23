import { Test, TestingModule } from '@nestjs/testing';
import { WrapupController } from './wrapup.controller';
import { WrapupService } from './wrapup.service';

describe('WrapupController', () => {
  let controller: WrapupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WrapupController],
      providers: [
        {
          provide: WrapupService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WrapupController>(WrapupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
