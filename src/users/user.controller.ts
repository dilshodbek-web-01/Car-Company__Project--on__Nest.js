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
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { UserService } from './user.service';
import { AdminAuthGuard, AuthGuard } from 'src/auth/guard/auth.guard';
import { UpdateUserDto, UserIdDto } from './dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';

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
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/read')
  @UseGuards(AdminAuthGuard)
  async getUsers() {
    let users = await this.userService.getUsers();
    return users;
  }

  @Get('/read/:id')
  @UseGuards(AdminAuthGuard)
  async getUser(@Param() user: UserIdDto) {
    return await this.userService.getUser(user);
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async updateUser(
    @Param() user: UserIdDto,
    @Body() updatedUser: UpdateUserDto,
    @UploadedFile() file,
  ) {
    return await this.userService.updateUser(user, file, updatedUser);
  }

  @Delete('/delete/:id')
  @UseGuards(AdminAuthGuard)
  async deleteUser(@Param() user: UserIdDto) {
    return await this.userService.deleteUser(user);
  }

  @Delete('/deleteMe')
  @UseGuards(AuthGuard)
  async deleteMe(@CurrentUser() user: UserIdDto) {
    return await this.userService.deleteMe(user);
  }
}
