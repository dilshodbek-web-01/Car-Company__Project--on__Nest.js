import { IsString, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IUser } from '../interface/auth.interface';

export class UserDto implements IUser {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Enter your username',
    default: 'user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Enter your email',
    default: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Enter your role',
    enum: ['admin', 'user'],
  })
  @IsString()
  role: string;

  @ApiProperty({
    type: Number,
    description: 'Enter your age',
    default: 23,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    type: String,
    description: 'Enter your password',
    default: 'user123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Enter your image',
    default: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
  })
  @IsString()
  image: string;
}

export class RegisterDto extends OmitType(UserDto, ['id']) {}

export class LoginDto extends PickType(UserDto, ['email', 'role', 'password']) {}
