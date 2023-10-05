import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BuyCarService } from './buyCar.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CarIdDto, CurrentUserDto } from './dto/cars.dto';
import { AdminAuthGuard, AuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';

@ApiBearerAuth()
@ApiTags('BuyCar')
@Controller('/buyCar')
@UseGuards(AuthGuard)
export class BuyCarController {
  constructor(private buyCarService: BuyCarService) {}

  @Get('/read')
  async getBuyCars(@CurrentUser() userInfo: CurrentUserDto) {
    return await this.buyCarService.getBuyCars(userInfo);
  }

  @Get('/read/:id')
  async getBuyCar(
    @Param() car: CarIdDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.buyCarService.getBuyCar(car, userInfo);
  }

  @Post('/create')
  async buyCar(
    @Body() carId: CarIdDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.buyCarService.buyCar(carId, userInfo);
  }

  @Delete('/delete/:id')
  async cancelCar(
    @Param() car: CarIdDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.buyCarService.cancelCar(car, userInfo);
  }
}
