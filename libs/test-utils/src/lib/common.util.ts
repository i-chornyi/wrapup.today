import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const getTestIdDataAttribute = (id: string) => {
  return `[data-test-id="${id}"]`;
};

export async function createTestDbConnection(
  dbConfig: PostgresConnectionOptions | TypeOrmModuleOptions,
) {
  return new DataSource(dbConfig as PostgresConnectionOptions).initialize();
}
