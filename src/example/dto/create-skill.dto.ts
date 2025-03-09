import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
@ApiSchema()
export class CreateSkillDto {
  @ApiProperty({
    description: 'Example Id. For delete or update Skill only.',
    required: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'Example Skill description.',
    required: false,
    example: 'NodeJs and NestJs expert.',
  })
  @IsString()
  description: string;

  @IsString()
  exampleId: string;

  @ApiProperty({
    description:
      'If the Example Skill is deleted. For delete or update Skill only.',
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
