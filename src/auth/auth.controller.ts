import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'Created user!' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/register')
  async register(@Body() userInfo: RegisterDto) {
    return await this.authService.register(userInfo);
  }

  @Post('/login')
  async login(@Body() userInfo: LoginDto) {
    return await this.authService.login(userInfo);
  }
}
