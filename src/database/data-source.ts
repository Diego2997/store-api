import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: +process.env.POSTGRES_PORT,
  migrationsTableName: 'migrations',
  synchronize: false,
  entities: ['src/**/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
