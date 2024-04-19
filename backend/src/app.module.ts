import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionConfiguration } from 'ormconfig';
import { UserModule } from './user/user.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConnectionConfiguration), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
