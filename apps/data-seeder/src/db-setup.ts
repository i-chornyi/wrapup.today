import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  AvatarSettingEntity,
  ProjectEntity,
  RefreshTokenEntity,
  UserEntity,
  WrapupEntity,
} from '@wrapup/db-entities';

export const E2E_TEST_DB_CONFIG:
  | PostgresConnectionOptions
  | TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  entities: [
    UserEntity,
    ProjectEntity,
    RefreshTokenEntity,
    AvatarSettingEntity,
    WrapupEntity,
  ],
};
