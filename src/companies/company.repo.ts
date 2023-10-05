import { Inject } from '@nestjs/common';
import { KnexConfig } from 'src/KnexConfig/knexConfig';

export class CompanyRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getCompanies() {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('companies');
  }

  createCompany({ title, image }, id) {
    const knex = this.knexConfig.instance;

    return knex('companies').insert({
      title,
      image,
      created_by: id,
    });
  }

  getOne(company) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('companies').where({ id: company.id });
  }

  getCars(company) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('cars').where({ created_by_comp: company.id });
  }

  deleteCompany(company, id) {
    const knex = this.knexConfig.instance;

    return knex.transaction(async (trx) => {
      await trx('liked')
        .whereIn('car_id', function () {
          this.select('id').from('cars').where('created_by_comp', company.id);
        })
        .del();
      await trx('buy')
        .whereIn('car_id', function () {
          this.select('id').from('cars').where('created_by_comp', company.id);
        })
        .del();
      await trx('cars').where('created_by_comp', company.id).del();
      return await trx('companies as c')
        .where({ id: company.id, created_by: id })
        .del();
    });
  }

  updateCompany(company, companyInfo, id) {
    const knex = this.knexConfig.instance;

    return knex('companies')
      .returning('*')
      .where({ id: company.id, created_by: id })
      .update(companyInfo);
  }
}
