import { ObjectLiteral, Repository } from 'typeorm';

export interface SeedService<T extends ObjectLiteral> {
  repository: Repository<T>;

  seedData: (dataToSeed: any) => Promise<T[]>;
}
