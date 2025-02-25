import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  description: string;

  @IsString()
  duacodeId: string;

  @IsBoolean()
  @IsOptional()
  is_deleted: boolean;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  deletedAt: Date;
}
