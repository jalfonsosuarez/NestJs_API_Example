import { Module } from '@nestjs/common';
import { DuacodeService } from './duacode.service';
import { DuacodeController } from './duacode.controller';

@Module({
  controllers: [DuacodeController],
  providers: [DuacodeService],
})
export class DuacodeModule {}
