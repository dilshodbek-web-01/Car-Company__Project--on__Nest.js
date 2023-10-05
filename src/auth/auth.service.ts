import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repo';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(userInfo) {
    try {
      let foundedUser = await this.authRepository.getUserByEmail(
        userInfo.email,
      );

      if (foundedUser[0]) {
        return new ConflictException('User already exists!');
      }

      userInfo.password = await bcrypt.hash(userInfo.password, 10);

      return await this.authRepository.register(userInfo);
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }

  async login(userInfo) {
    let result = await this.authRepository.login(userInfo);

    if (result.length == 0) throw new NotFoundException();

    let checkPwd = await bcrypt.compare(userInfo.password, result[0].password);
    if (!checkPwd) {
      return {
        message: 'Password invalid!',
      };
    }

    if (result[0].role === 'admin') {
      let token = await this.jwtService.sign({
        id: result[0].id,
        role: result[0].role,
      });
      return {
        message: 'OK',
        admin: true,
        token,
      };
    }

    let token = await this.jwtService.sign({ id: result[0].id });
    return {
      message: 'OK',
      admin: false,
      token,
    };
  }
}
