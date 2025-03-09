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
export class CreateExampleDto {
  @ApiProperty({
    description: 'Example NIF',
    required: true,
    example: 'A23456432',
  })
  @IsString()
  nif: string;

  @ApiProperty({
    description: 'Example name',
    required: true,
    example: 'A Example name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Example boografy',
    required: true,
    example: 'A Example is a person that work with Duadode apps.',
  })
  @IsString()
  biografy: string;

  @ApiProperty({
    description: 'Example work departament',
    required: false,
    example: 'Doacode works into development departament.',
  })
  @IsString()
  departament: string;

  @ApiProperty({
    description: 'Example work station',
    required: false,
    example: 'Example senior NodeJs and NestJs developer',
  })
  @IsString()
  workstation: string;

  @ApiProperty({
    description: 'Example array of skills',
    required: false,
    type: CreateSkillDto,
    isArray: true,
  })
  @IsArray()
  skills: CreateSkillDto[];

  @ApiProperty({
    description: 'Example url fotagrafy',
    required: false,
    example:
      'https://res.cloudinary.com/dyqanox0e/image/upload/v1731514460/zapaweb/images/mxbgkoy9kmzvofnt4ts3.jpg',
  })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({
    description: 'Example likes spanish omelet with or without onion',
    required: true,
    default: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  omeletOnion: boolean;

  @ApiProperty({
    description: 'Example birthdate',
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
