import { Module } from '@nestjs/common';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';
import { BuyCarService } from './buyCar.service';
import { BuyCarController } from './buyCar.controller';
import { BuyCarRepository } from './buyCar.repo';

@Module({
  imports: [KnexConfigModule],
  controllers: [BuyCarController],
  providers: [BuyCarService, BuyCarRepository],
})
export class BuyCarModule {}
