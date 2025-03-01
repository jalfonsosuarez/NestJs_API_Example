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
  })
  @IsString()
  nif: string;

  @ApiProperty({
    description: 'Duacode name',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Duacode boografy',
    required: true,
  })
  @IsString()
  biografy: string;

  @ApiProperty({
    description: 'Duacode work departament',
    required: false,
  })
  @IsString()
  departament: string;

  @ApiProperty({
    description: 'Duacode work station',
    required: false,
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
  })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({
    description: 'Duacode likes spanish omelet with or without onion',
    required: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  omeletOnion: boolean;

  @ApiProperty({
    description: 'Duacode birthdate',
    required: false,
    default: null,
  })
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  birthdate?: Date;
}
