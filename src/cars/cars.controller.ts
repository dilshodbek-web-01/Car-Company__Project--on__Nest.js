import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CarIdDto, CreateOrUpdateCarDto, CurrentUserDto } from './dto/cars.dto';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AdminAuthGuard, AuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';

export const storage = {
  storage: diskStorage({
    destination: './upload/',
    filename: (_, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiBearerAuth()
@ApiTags('Cars')
@Controller('/cars')
@UseGuards(AuthGuard)
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get('/read')
  async getCars() {
    return await this.carsService.getCars();
  }

  @Get('/read/:id')
  async getCar(@Param() car: CarIdDto) {
    return await this.carsService.getCar(car);
  }

  @Post('/create')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FilesInterceptor('file', 3, storage))
  async createCar(
    @Body() carInfo: CreateOrUpdateCarDto,
    @UploadedFiles() files,
    @CurrentUser() userInfo: CurrentUserDto,
  ): Promise<any> {
    carInfo.inside_image = files[0].filename;
    carInfo.outside_image = files[1].filename;
    carInfo.side_image = files[2].filename;

    return await this.carsService.createCar(carInfo, userInfo);
  }

  @Delete('delete/:id')
  @UseGuards(AdminAuthGuard)
  async deleteCar(
    @Param() car: CarIdDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.carsService.deleteCar(car, userInfo);
  }

  @Put('update/:id')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FilesInterceptor('file', 3, storage))
  async updateCar(
    @Param() car: CarIdDto,
    @Body() carInfo: CreateOrUpdateCarDto,
    @UploadedFiles() files,
    @CurrentUser() userInfo: CurrentUserDto,
  ): Promise<any> {
    carInfo.inside_image = files[0].filename;
    carInfo.outside_image = files[1].filename;
    carInfo.side_image = files[2].filename;

    return await this.carsService.updateCar(car, carInfo, userInfo);
  }
}
