import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DuacodeModule } from './duacode/duacode.module';

@Module({
  imports: [UserModule, DuacodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
