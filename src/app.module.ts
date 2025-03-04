import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DuacodeModule } from './duacode/duacode.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthModule, UserModule, DuacodeModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
