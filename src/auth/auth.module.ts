import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { ConfigType } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || 'SECRET',
    //   signOptions: {
    //     expiresIn: '2h',
    //   },
    // }),
    JwtModule.registerAsync({
      inject: [configuration.KEY],
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { secret } = configService.jwt;
        return {
          secret,
          signOptions: { expiresIn: '2h' },
        };
      },
    }),
  ],
})
export class AuthModule {}
