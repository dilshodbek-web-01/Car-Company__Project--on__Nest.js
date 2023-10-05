import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repo';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwt: JwtService,
  ) {}

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUser({ id }) {
    return await this.userRepository.getUser(id);
  }

  async deleteUser({ id }) {
    let getOne = await this.userRepository.getUser(id);
    console.log(getOne);
    if (!getOne[0]) {
      return {
        msg: 'User was not found!',
      };
    }
    await this.userRepository.deleteUser(id);

    return {
      message: 'User was deleted!',
    };
  }

  async deleteMe({ id }) {
    let getOne = await this.userRepository.getUser(id);
    if (!getOne[0]) {
      return {
        msg: 'User was not found!',
      };
    }
    await this.userRepository.deleteMe(id);

    return {
      message: 'Your account was deleted!',
    };
  }

  async updateUser({ id }, file, updatedUser) {
    let getOne = await this.userRepository.getUser(id);
    if (!getOne[0]) {
      return {
        message: 'User was not found!',
      };
    }

    updatedUser.password = await bcrypt.hash(updatedUser.password, 10);

    updatedUser.username = updatedUser.username
      ? updatedUser.username
      : getOne[0].username;
    updatedUser.email = updatedUser.email ? updatedUser.email : getOne[0].email;
    updatedUser.password = updatedUser.password
      ? updatedUser.password
      : getOne[0].password;
    updatedUser.image = file ? file.filename : getOne[0].image;

    await this.userRepository.updateUser(id, updatedUser);
    return {
      message: 'User was updated!',
    };
  }
}
