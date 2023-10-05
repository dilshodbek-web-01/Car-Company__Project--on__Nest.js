import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repo';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';

@Module({
    imports: [KnexConfigModule],
    controllers: [CompanyController],
    providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
