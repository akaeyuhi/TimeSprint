import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TeamModule } from 'src/team/team.module';
import { ProjectRepository } from 'src/project/project.repository';
import { TaskModule } from 'src/task/task.module';
import { TeamService } from 'src/team/team.service';
import { TaskService } from 'src/task/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), TeamModule, TaskModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService]
})
export class ProjectModule {}
