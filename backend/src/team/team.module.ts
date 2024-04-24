import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/team/entities/team.entity';
import { TeamRepository } from 'src/team/team.repository';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { TaskService } from 'src/task/task.service';
import { TaskModule } from 'src/task/task.module';
import { TaskRepository } from 'src/task/task.repository';

@Module({
  imports: [UserModule, TaskModule, TypeOrmModule.forFeature([Team])],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
  exports: [TeamService],
})
export class TeamModule {}
