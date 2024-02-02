import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  database: 'my_db',
  username: 'root',
  password: '123456',
  port: 5432,
  migrationsTableName: 'migrations',
  synchronize: false,
  entities: ['src/**/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
