import { Module } from '@nestjs/common';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarsRepository } from './cars.repo';

@Module({
  imports: [KnexConfigModule],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository],
})
export class CarsModule {}
