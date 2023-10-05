import { Inject } from '@nestjs/common';
import { KnexConfig } from 'src/KnexConfig/knexConfig';

export class CarsRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getCars() {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('cars');
  }

  createCar(
    {
      title,
      inside_image,
      outside_image,
      side_image,
      tinted,
      motor,
      year,
      color,
      distance,
      gearbook,
      price,
      description,
      created_by_comp,
    },
    id,
  ) {
    const knex = this.knexConfig.instance;

    return knex('cars').insert({
      title,
      inside_image,
      outside_image,
      side_image,
      tinted,
      motor,
      year,
      color,
      distance,
      gearbook,
      price,
      description,
      created_by_comp,
      created_by: id,
    });
  }

  getOne(car) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('cars').where({ id: car.id });
  }

  async deleteCar(car, id) {
    const knex = this.knexConfig.instance;

    await knex('buy').returning('*').where({ car_id: car.id }).del();
    await knex('liked').returning('*').where({ car_id: car.id }).del();

    return (
      knex('cars')
        .returning('*')
        // .where({ id })
        .where({ id: car.id, created_by: id })
        .del()
    );
  }

  updateCar(car, carInfo, id) {
    const knex = this.knexConfig.instance;

    return knex('cars')
      .returning('*')
      .where({ id: car.id, created_by: id })
      .update(carInfo);
  }
}
