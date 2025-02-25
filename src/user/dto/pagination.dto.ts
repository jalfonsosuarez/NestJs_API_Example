/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { UserRole } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsPositive, IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRoleList } from '../enum/role.enum';

export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsString()
  @IsOptional()
  @IsEnum(UserRoleList, {
    message: `Possible roles values are ${UserRoleList}`,
  })
  role?: UserRole;
}
