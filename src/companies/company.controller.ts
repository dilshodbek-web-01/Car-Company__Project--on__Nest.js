import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';
import { CompanyService } from './company.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
  CompanyIdDto,
  CreateOrUpdateDto,
  CurrentUserDto,
} from './dto/company.dto';
import { AdminAuthGuard, AuthGuard } from 'src/auth/guard/auth.guard';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

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
@ApiTags('Company')
@Controller('/companies')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('/read')
  async getCompanies() {
    return await this.companyService.getCompanies();
  }

  @Get('/read/:id')
  async getCompany(
    @Param() company: CompanyIdDto,
  ) {
    return await this.companyService.getCompany(company);
  }

  
  @Get('/readCompanyCars/:id')
  async getCompanyCars(
    @Param() company: CompanyIdDto,
  ) {
    return await this.companyService.getCompanyCars(company);
  }

  @Post('/create')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async createCompany(
    @Body() companyInfo: CreateOrUpdateDto,
    @UploadedFile() file,
    @CurrentUser() userInfo: CurrentUserDto,
  ): Promise<any> {
    companyInfo.image = file.filename;

    return await this.companyService.createCompany(companyInfo, userInfo);
  }

  @Delete('delete/:id')
  @UseGuards(AdminAuthGuard)
  async deleteCompany(
    @Param() company: CompanyIdDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.companyService.deleteCompany(company, userInfo);
  }

  @Put('update/:id')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async updateCompany(
    @Param() company: CompanyIdDto,
    @Body() companyInfo: CreateOrUpdateDto,
    @UploadedFile() file,
    @CurrentUser() userInfo: CurrentUserDto,
  ): Promise<any> {
    companyInfo.image = file.filename;

    return await this.companyService.updateCompany(
      company,
      companyInfo,
      userInfo,
    );
  }
}
