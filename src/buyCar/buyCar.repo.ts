import { Inject } from '@nestjs/common';
import { KnexConfig } from 'src/KnexConfig/knexConfig';

export class BuyCarRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getBuyCars(id) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('buy').where({ user_id: id });
  }

  getOne(car, id) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('buy').where({ id: car.id, user_id: id });
  }

  buyCar({ id: car_id }, id) {
    const knex = this.knexConfig.instance;

    return knex('buy').insert({ car_id, user_id: id });
  }

  cancelCar(car, id) {
    const knex = this.knexConfig.instance;

    return (
      knex('buy')
        .returning('*')
        // .where({ id })
        .where({ id: car.id, user_id: id })
        .del()
    );
  }
}
