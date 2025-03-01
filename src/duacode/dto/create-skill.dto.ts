import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
@ApiSchema()
export class CreateSkillDto {
  @ApiProperty({
    description: 'Duacode Id. For delete or update Skill only.',
    required: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'Duacode Skill description.',
    required: false,
    example: 'NodeJs and NestJs expert.',
  })
  @IsString()
  description: string;

  @IsString()
  duacodeId: string;

  @ApiProperty({
    description:
      'If the Duacode Skill is deleted. For delete or update Skill only.',
    required: false,
    default: false,
    example: false,
  })
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
