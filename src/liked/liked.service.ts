import { Injectable, NotFoundException } from '@nestjs/common';
import { LikedCarRepository } from './liked.repo';

@Injectable()
export class LikedCarService {
  constructor(private likedCarRepository: LikedCarRepository) {}

  async getLikedCars({ id }) {
    return this.likedCarRepository.getLikedCars(id);
  }

  async getLikedCar(car, { id }) {
    let result = await this.likedCarRepository.getOne(car, id);
    if (result.length == 0)
      return new NotFoundException(`Liked_car ${car.id} not found!`);

    return result;
  }

  async likedCar(carId, { id }) {
    let result = await this.likedCarRepository.getOneCar(carId, id);

    if (result[0]) {
      await this.likedCarRepository.dislikeCar(carId, id);
      return {
        message: 'Dislike car',
      };
    }

    await this.likedCarRepository.likedCar(carId, id);

    return {
      message: 'Liked car',
    };
  }

  async dislikeCar(car, { id }) {
    let result = await this.likedCarRepository.dislikeCar(car, id);

    if (result.length === 0) {
      return new NotFoundException(`Liked_car ${car.id} not found!`);
    }
    return {
      message: 'Liked_car deleted!',
    };
  }
}
