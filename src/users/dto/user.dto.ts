import { IsString } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IUser } from '../interface/user.interface';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class UserDto implements IUser {
  @ApiProperty({
    type: String,
  })
  id: string;
  @ApiProperty({
    type: String,
    default: 'user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    default: 'example@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    default: 'user123'
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    default: 'https://ford.prodealerwebsites.com.au/specials/default.png',
  })
  @IsString()
  image: string;
}

export class UpdateUserDto extends OmitType(UserDto, ['id']) {}
export class UserIdDto extends PickType(UserDto, ['id']) {}
