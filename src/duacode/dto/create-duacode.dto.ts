/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateSkillDto } from './create-skill.dto';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema()
export class CreateDuacodeDto {
  @ApiProperty({
    description: 'Duacode NIF',
    required: true,
    example: 'A Duacode description',
  })
  @IsString()
  nif: string;

  @ApiProperty({
    description: 'Duacode name',
    required: true,
    example: 'A Duacode name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Duacode boografy',
    required: true,
    example: 'A Duacode is a person that work with Duadode apps.',
  })
  @IsString()
  biografy: string;

  @ApiProperty({
    description: 'Duacode work departament',
    required: false,
    example: 'Doacode works into development departament.',
  })
  @IsString()
  departament: string;

  @ApiProperty({
    description: 'Duacode work station',
    required: false,
    example: 'Duacode senior NodeJs and NestJs developer',
  })
  @IsString()
  workstation: string;

  @ApiProperty({
    description: 'Duacode array of skills',
    required: false,
    type: CreateSkillDto,
    isArray: true,
  })
  @IsArray()
  skills: CreateSkillDto[];

  @ApiProperty({
    description: 'Duacode url fotagrafy',
    required: false,
    example:
      'https://res.cloudinary.com/dyqanox0e/image/upload/v1731514460/zapaweb/images/mxbgkoy9kmzvofnt4ts3.jpg',
  })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({
    description: 'Duacode likes spanish omelet with or without onion',
    required: true,
    default: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  omeletOnion: boolean;

  @ApiProperty({
    description: 'Duacode birthdate',
    required: false,
    default: null,
    example: '2004-05-23',
  })
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  birthdate?: Date;
}
