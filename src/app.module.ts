import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BuyCarModule } from './buyCar/buyCar.module';
import { CarsModule } from './cars/cars.module';
import { CompanyModule } from './companies/company.module';
import { KnexConfigModule } from './KnexConfig/Knex.module';
import { LikedCarModule } from './liked/liked.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    KnexConfigModule,
    AuthModule,
    CompanyModule,
    CarsModule,
    BuyCarModule,
    LikedCarModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
