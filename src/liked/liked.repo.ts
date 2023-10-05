import { Inject } from '@nestjs/common';
import { KnexConfig } from 'src/KnexConfig/knexConfig';

export class LikedCarRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getLikedCars(id) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('liked').where({ user_id: id });
  }

  getOne(car, id) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('liked').where({ id: car.id, user_id: id });
  }

  getOneCar(car, id) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('liked').where({ car_id: car.id, user_id: id });
  }

  likedCar({ id: car_id }, id) {
    const knex = this.knexConfig.instance;

    return knex('liked').insert({ car_id, user_id: id });
  }

  dislikeCar(car, id) {
    const knex = this.knexConfig.instance;

    return (
      knex('liked')
        .returning('*')
        // .where({ id })
        .where({ car_id: car.id, user_id: id })
        .del()
    );
  }
}
