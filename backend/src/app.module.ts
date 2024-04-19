import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionConfiguration } from 'ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConnectionConfiguration)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
