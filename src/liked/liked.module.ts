import { Module } from '@nestjs/common';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';
import { LikedCarService } from './liked.service';
import { LikedCarController } from './liked.controller';
import { LikedCarRepository } from './liked.repo';

@Module({
  imports: [KnexConfigModule],
  controllers: [LikedCarController],
  providers: [LikedCarService, LikedCarRepository],
})
export class LikedCarModule {}
