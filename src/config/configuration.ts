import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.PORT,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: +process.env.POSTGRES_PORT,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
});
