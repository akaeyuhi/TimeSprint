import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionConfiguration } from 'ormconfig';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConnectionConfiguration),
    UserModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
