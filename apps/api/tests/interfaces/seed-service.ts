import { DeleteResult } from 'typeorm';

export interface SeedService {
  cleanUpDatabaseTable: () => Promise<DeleteResult>;
}
