import { IsString } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ICar } from '../interface/cars.interface';

export class CarDto implements ICar {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Enter car name',
    default: 'Rolls-Roys',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Enter car inside Image Name',
    default: 'Rolls-Roys',
  })
  inside_image: string;

  @ApiProperty({
    type: String,
    description: 'Enter car outside Image Name',
    default: 'Rolls-Roys',
  })
  outside_image: string;

  @ApiProperty({
    type: String,
    description: 'Enter car side Image Name',
    default: 'Rolls-Roys',
  })
  side_image: string;

  @ApiProperty({
    type: String,
    description: 'Enter car tinted',
    default: 'yes',
  })
  @IsString()
  tinted: string;

  @ApiProperty({
    type: String,
    description: 'Enter car motor:',
    default: '1.6',
  })
  @IsString()
  motor: string;

  @ApiProperty({
    type: String,
    description: 'Enter car year',
    default: '2023',
  })
  @IsString()
  year: string;

  @ApiProperty({
    type: String,
    description: 'Enter car color',
    default: 'white',
  })
  @IsString()
  color: string;

  @ApiProperty({
    type: String,
    description: 'Enter car km/ml',
    default: '1000 km',
  })
  @IsString()
  distance: string;

  @ApiProperty({
    type: String,
    description: 'Enter car automatic or mexanic',
    default: 'automatic',
  })
  @IsString()
  gearbook: string;

  @ApiProperty({
    type: String,
    description: 'Enter car pirce',
    default: '100 000 000',
  })
  @IsString()
  price: string;

  @ApiProperty({
    type: String,
    description: 'Enter car description',
    default: 'best of the best',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    description: 'Enter company ID',
    default: 'd88afb8a-98b2-4ebe-9781-d1fd9362bc52',
  })
  @IsString()
  created_by_comp: string;
}

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class CreateOrUpdateCarDto extends OmitType(CarDto, ['id']) {}

export class CarIdDto extends PickType(CarDto, ['id']) {}
