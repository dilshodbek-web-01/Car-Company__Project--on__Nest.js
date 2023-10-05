import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LikedCarService } from './liked.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CarIdDto, CurrentUserDto } from './dto/cars.dto';
import { AdminAuthGuard, AuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';

@ApiBearerAuth()
@ApiTags('Liked')
@Controller('/liked')
@UseGuards(AuthGuard)
export class LikedCarController {
  constructor(private likedCarService: LikedCarService) {}

  @Get('/read')
  async getLikedCars(@CurrentUser() userInfo: CurrentUserDto) {
    return await this.likedCarService.getLikedCars(userInfo);
  }

  @Get('/read/:id')
  async getLikedCar(
    @Param() car: CarIdDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.likedCarService.getLikedCar(car, userInfo);
  }

  @Post('/create')
  async likedCar(
    @Body() carId: CarIdDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.likedCarService.likedCar(carId, userInfo);
  }

  @Delete('/delete/:id')
  async dislikeCar(
    @Param() car: CarIdDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.likedCarService.dislikeCar(car, userInfo);
  }
}
