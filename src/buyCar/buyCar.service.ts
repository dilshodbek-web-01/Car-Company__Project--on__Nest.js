import { Injectable, NotFoundException } from '@nestjs/common';
import { BuyCarRepository } from './buyCar.repo';

@Injectable()
export class BuyCarService {
  constructor(private buyCarRepository: BuyCarRepository) {}

  async getBuyCars({ id }) {
    return this.buyCarRepository.getBuyCars(id);
  }

  async getBuyCar(car, { id }) {
    let result = await this.buyCarRepository.getOne(car, id);
    if (result.length == 0)
      return new NotFoundException(`Buy_car ${car.id} not found!`);

    return result;
  }

  async buyCar(carId, { id }) {
    await this.buyCarRepository.buyCar(carId, id);

    return {
      message: 'Buy car',
    };
  }

  async cancelCar(car, { id }) {
    let result = await this.buyCarRepository.cancelCar(car, id);

    if (result.length === 0) {
      return new NotFoundException(`Buy_car ${car.id} not found!`);
    }
    return {
      message: 'Buy_car deleted!',
    };
  }

}
