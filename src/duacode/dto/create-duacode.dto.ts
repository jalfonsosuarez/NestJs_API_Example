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

export class CreateDuacodeDto {
  @IsString()
  nif: string;

  @IsString()
  name: string;

  @IsString()
  biografy: string;

  @IsString()
  departament: string;

  @IsString()
  workstation: string;

  @IsArray()
  skills: CreateSkillDto[];

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsBoolean()
  @IsOptional()
  omeletOnion: boolean;

  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  birthdate?: Date;
}
