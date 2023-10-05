import { Module } from '@nestjs/common';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repo';
import { UserService } from './user.service';

@Module({
  imports: [KnexConfigModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
