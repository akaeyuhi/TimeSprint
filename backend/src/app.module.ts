import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionConfiguration } from 'ormconfig';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { LeisureActivityModule } from './leisure-activity/leisure-activity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConnectionConfiguration),
    UserModule,
    TeamModule,
    AuthModule,
    ProjectModule,
    TaskModule,
    LeisureActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
