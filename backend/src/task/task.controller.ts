import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.taskService.findById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.taskService.deleteTask(id);
  }

  @Get()
  async findAllTasksWithDependencies(): Promise<Task[]> {
    return await this.taskService.findAllTaskWithDependencies();
  }

  @Get(':id')
  async getTaskDependencies(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task[]> {
    return await this.taskService.findTaskDependencies(id);
  }
}
