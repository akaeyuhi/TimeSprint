import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { AddTasksDto } from 'src/project/dto/add-tasks.dto';
import { Task } from 'src/entities/task.entity';
import { UserRole } from 'src/user/utils';
import { TeamRolesGuard } from 'src/team/guards/team.guard';
import { TeamRoles } from 'src/team/decorators/team.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard, TeamRolesGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return await this.projectService.findAllProjects();
  }

  @Get(':id')
  async getProjectById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Project> {
    return await this.projectService.findProjectById(id);
  }

  @Post()
  @UseGuards(TeamRolesGuard)
  @TeamRoles(UserRole.ADMIN)
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return await this.projectService.createProject(createProjectDto);
  }

  @Put(':id')
  @UseGuards(TeamRolesGuard)
  @TeamRoles(UserRole.ADMIN)
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(TeamRolesGuard)
  @TeamRoles(UserRole.ADMIN)
  async deleteProject(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.projectService.deleteProject(id);
  }
  @Post(':projectId/tasks')
  @UseGuards(TeamRolesGuard)
  @TeamRoles(UserRole.ADMIN)
  async addTaskToProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() taskIds: AddTasksDto,
  ): Promise<Task[]> {
    return await this.projectService.addTaskToProject(projectId, taskIds);
  }

  @Delete(':projectId/tasks/:taskId')
  @UseGuards(TeamRolesGuard)
  @TeamRoles(UserRole.ADMIN)
  async removeTaskFromProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ): Promise<void> {
    await this.projectService.removeTaskFromProject(projectId, taskId);
  }
}
