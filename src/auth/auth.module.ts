import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repo';
import { KnexConfig } from 'src/KnexConfig/knexConfig';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret_key',
      signOptions: {},
    }),
  ],
  providers: [AuthService, AuthRepository, KnexConfig],
  controllers: [AuthController],
})
export class AuthModule {}
