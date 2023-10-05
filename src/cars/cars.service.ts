import { Injectable, NotFoundException } from '@nestjs/common';
import { CarsRepository } from './cars.repo';

@Injectable()
export class CarsService {
  constructor(private carsRepository: CarsRepository) {}

  async getCars() {
    return this.carsRepository.getCars();
  }

  async getCar(car) {
    let result = await this.carsRepository.getOne(car);
    if (result.length == 0)
      return new NotFoundException(`Car ${car.id} not found!`);

    return result;
  }

  async createCar(carInfo, { id }) {
    let newCar = await this.carsRepository.createCar(carInfo, id);

    return {
      message: 'Created car',
    };
  }

  async deleteCar(car, { id }) {
    let result = await this.carsRepository.deleteCar(car, id);

    if (result.length === 0) {
      return new NotFoundException(`Car ${car.id} not found!`);
    }
    return {
      message: 'Car deleted!',
    };
  }

  async updateCar(car, carInfo, { id }) {
    let result = await this.carsRepository.updateCar(car, carInfo, id);

    if (result.length === 0) {
      return new NotFoundException(`Car ${car.id} not found!`);
    }
    return {
      message: 'Car updated!',
    };
  }
}
