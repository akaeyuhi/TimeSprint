import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ProjectModule } from 'src/project/project.module';
import { TaskRepository } from 'src/task/task.repository';
import { ProjectService } from 'src/project/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ProjectModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, ProjectService],
})
export class TaskModule {}
