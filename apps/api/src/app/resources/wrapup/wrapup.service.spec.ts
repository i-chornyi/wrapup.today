import { Test, TestingModule } from '@nestjs/testing';
import { WrapupService } from './wrapup.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WrapupEntity } from './entities/wrapup.entity';
import { ProjectService } from '../project/project.service';

describe('WrapupService', () => {
  let service: WrapupService;
  let wrapupRepository: Repository<WrapupEntity>;
  const wrapupRepositoryToken = getRepositoryToken(WrapupEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WrapupService,
        { provide: wrapupRepositoryToken, useValue: {} },
        { provide: ProjectService, useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    service = module.get<WrapupService>(WrapupService);
    wrapupRepository = module.get<Repository<WrapupEntity>>(
      wrapupRepositoryToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
