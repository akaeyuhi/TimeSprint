import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Team } from 'src/entities/team.entity';
import { LeisureActivity } from 'src/entities/leisure_activity.entity';
import { Project } from 'src/entities/project.entity';
import { Task } from 'src/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [User, Team, LeisureActivity, Project, Task],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
