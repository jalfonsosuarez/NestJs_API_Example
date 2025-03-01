import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DuacodeModule } from './duacode/duacode.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, DuacodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
