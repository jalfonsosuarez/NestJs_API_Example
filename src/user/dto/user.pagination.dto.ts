/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { UserRole } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsPositive, IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRoleList } from '../enum/role.enum';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema()
export class UserPaginationDto {
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
    description: 'User role to filter. Must be ADMIN | SUPERUSER | USER.',
    required: false,
    default: null,
  })
  @IsString()
  @IsOptional()
  @IsEnum(UserRoleList, {
    message: `Possible roles values are ${UserRoleList}`,
  })
  role?: UserRole;
}
