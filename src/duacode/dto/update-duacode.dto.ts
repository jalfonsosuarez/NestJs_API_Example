import { PartialType } from '@nestjs/swagger';
import { CreateDuacodeDto } from './create-duacode.dto';

export class UpdateDuacodeDto extends PartialType(CreateDuacodeDto) {}
