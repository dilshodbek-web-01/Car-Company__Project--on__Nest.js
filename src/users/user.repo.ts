import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/KnexConfig/knexConfig';

@Injectable()
export class UserRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getUsers() {
    const knex = this.knexConfig.instance;
    const users = knex.select('*').from('users');
    return users;
  }

  getUser(id) {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('users').where({ id });
  }

  deleteUser(id) {
    const knex = this.knexConfig.instance;
    return knex.transaction(async (trx) => {
      await trx('liked').where('user_id', id).del();
      await trx('buy').where('user_id', id).del();
      await trx('users').where('id', id).del();
    });
  }

  deleteMe(id) {
    const knex = this.knexConfig.instance;
    return knex.transaction(async (trx) => {
      await trx('liked').where('user_id', id).del();
      await trx('buy').where('user_id', id).del();
      await trx('users').where('id', id).del();
    });
  }

  updateUser(id, updatedUser) {
    const knex = this.knexConfig.instance;
    return knex('users').where({ id }).update(updatedUser);
  }
}
