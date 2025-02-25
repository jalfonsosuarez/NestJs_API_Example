import { PartialType } from '@nestjs/mapped-types';
import { CreateDuacodeDto } from './create-duacode.dto';

export class UpdateDuacodeDto extends PartialType(CreateDuacodeDto) {}
