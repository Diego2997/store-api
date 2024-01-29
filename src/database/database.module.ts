import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [configuration.KEY],
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { user, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          port,
          username: user,
          password,
          database: dbName,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
