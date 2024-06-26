import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { Task } from 'src/task/entities/task.entity';
import { AdminRole, TeamRole } from 'src/user/utils';
import { TeamRolesGuard } from 'src/team/guards/team.guard';
import { TeamRoles } from 'src/team/decorators/team.decorator';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsUserRole } from 'src/site-admin/decorators/site-admin.decorator';
import { SiteAdminGuard } from 'src/site-admin/guards/site-admin.guard';

@ApiTags('Projects')
@ApiBearerAuth('JWT')
@Controller('projects')
@UseGuards(JwtAuthGuard, TeamRolesGuard, SiteAdminGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({
    summary: 'Gets all projects.',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Project })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @IsUserRole(AdminRole.ADMIN)
  async getAllProjects(): Promise<Project[]> {
    return await this.projectService.findAllProjects();
  }

  @Get(':projectId')
  @ApiOperation({
    summary: 'Gets project by id.',
  })
  @ApiParam({
    name: 'projectId',
    required: true,
    description: 'Project identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Project })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Project not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getProjectById(@Param('projectId') id: string): Promise<Project> {
    return await this.projectService.findProjectById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates new project. Team admin rights required.',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Project })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return await this.projectService.createProject(createProjectDto);
  }

  @Put(':projectId')
  @ApiOperation({
    summary: 'Updates project by id. Team admin rights required.',
  })
  @ApiParam({
    name: 'projectId',
    required: true,
    description: 'Project identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Project })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Project not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async updateProject(
    @Param('projectId') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':projectId')
  @ApiOperation({
    summary: 'Deletes project by id. Team admin rights required.',
  })
  @ApiParam({
    name: 'projectId',
    required: true,
    description: 'Project identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Project not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async deleteProject(@Param('projectId') id: string): Promise<void> {
    await this.projectService.deleteProject(id);
  }

  @Post(':projectId/tasks')
  @ApiOperation({
    summary: 'Creates new task in project. Team admin rights required.',
  })
  @ApiParam({
    name: 'projectId',
    required: true,
    description: 'Project identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Task })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Project not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async addTaskToProject(
    @Param('projectId') projectId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.projectService.createTaskInProject(
      projectId,
      createTaskDto,
    );
  }

  @Delete(':projectId/tasks/:taskId')
  @ApiOperation({
    summary: 'Deletes task in project. Team admin rights required.',
  })
  @ApiParam({
    name: 'projectId',
    required: true,
    description: 'Project identifier',
  })
  @ApiParam({
    name: 'taskId',
    required: true,
    description: 'Task identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Project not found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async removeTaskFromProject(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ): Promise<void> {
    await this.projectService.removeTaskFromProject(projectId, taskId);
  }

  @Get('by-team/:teamId')
  @ApiOperation({
    summary: 'Gets projects by team',
  })
  @ApiParam({
    name: 'teamId',
    required: true,
    description: 'Team identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Project })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Team not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findProjectsByTeam(
    @Param('teamId') teamId: string,
  ): Promise<Project[]> {
    return await this.projectService.findProjectsByTeam(teamId);
  }

  @Get(':projectId/tasks')
  @ApiOperation({
    summary: 'Gets tasks of the project',
  })
  @ApiParam({
    name: 'projectId',
    required: true,
    description: 'Project identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Task })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Project not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findTasksInProject(
    @Param('projectId') projectId: string,
  ): Promise<Task[]> {
    return await this.projectService.findTasksByProject(projectId);
  }
}
