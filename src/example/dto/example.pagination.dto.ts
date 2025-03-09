import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPositive, IsOptional, IsString } from 'class-validator';

export class ExamplePaginationDto {
  @ApiProperty({
    description: 'Page number. Must be a positive number.',
    required: false,
    default: 1,
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'Records per page. Must be a positive number.',
    required: false,
    default: 10,
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    description: 'Example name to be filtered.',
    required: false,
    default: null,
  })
  @IsString()
  @IsOptional()
  exampleName?: string;
}
