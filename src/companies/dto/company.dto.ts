import { IsString } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ICompany } from '../interface/company.interface';

export class CompanyDto implements ICompany {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Enter Company title',
    default: 'Chevrolet Malibu',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Enter car Image Name',
    default: 'IMG name',
  })
  image: string;
}

export class CurrentUserDto{
  @ApiProperty({
      type: String
  })
  @IsString()
  id: string;
}

export class CreateOrUpdateDto extends OmitType(CompanyDto, ['id']){}

export class CompanyIdDto extends PickType(CompanyDto, ['id']){}

