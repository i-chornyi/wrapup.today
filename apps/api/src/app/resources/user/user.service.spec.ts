import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;
  const userRepositoryToken = getRepositoryToken(UserEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: userRepositoryToken,
          useValue: {
            findOneOrFail: jest.fn().mockReturnValue({
              id: '1',
              firstName: 'John',
              lastName: 'Doe',
            } as UserEntity),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(userRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by ID', async () => {
    const user = await service.findOneById('1');

    expect(user).toBeDefined();
    expect(user).toEqual({ id: '1', firstName: 'John', lastName: 'Doe' });
  });
});
