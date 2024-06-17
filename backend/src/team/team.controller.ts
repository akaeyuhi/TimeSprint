import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { Team } from 'src/team/entities/team.entity';
import { UpdateTeamDto } from 'src/team/dto/update-team.dto';
import { TeamRolesGuard } from 'src/team/guards/team.guard';
import { TeamRoles } from 'src/team/decorators/team.decorator';
import { AdminRole, TeamRole } from 'src/user/utils';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateProjectDto } from 'src/project/dto/create-project.dto';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { SiteAdminGuard } from 'src/site-admin/guards/site-admin.guard';
import { IsUserRole } from 'src/site-admin/decorators/site-admin.decorator';

@ApiTags('Teams')
@ApiBearerAuth('JWT')
@Controller('teams')
@UseGuards(JwtAuthGuard, TeamRolesGuard, SiteAdminGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new team.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createTeam(
    @Body() createTeamDto: CreateTeamDto,
    @Req() req: any,
  ): Promise<Team> {
    return this.teamService.createTeam(createTeamDto, req.user.id);
  }

  @Put(':teamId/join')
  @ApiOperation({ summary: 'Joins to the team by id.' })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async joinTeam(
    @Param('teamId') teamId: string,
    @Req() req: any,
  ): Promise<User> {
    return this.teamService.joinTeam(req.user.id, teamId);
  }

  @Put(':teamId/leave')
  @ApiOperation({ summary: 'Leaves the team by id.' })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: null })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async leaveTeam(
    @Param('teamId') teamId: string,
    @Req() req: any,
  ): Promise<void> {
    return this.teamService.leaveTeam(teamId, req.user.id);
  }

  @Put(':teamId/add-member/:memberId')
  @ApiOperation({
    summary: 'Adds new member to the team. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiParam({ name: 'memberId', required: true, description: 'New member id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async addMember(
    @Param('teamId') teamId: string,
    @Param('memberId') memberId: string,
  ): Promise<User> {
    return this.teamService.addMember(teamId, memberId);
  }

  @Put(':teamId/add-admin/:adminId')
  @ApiOperation({
    summary: 'Adds new team admin. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiParam({ name: 'adminId', required: true, description: 'New admin id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async addAdmin(
    @Param('teamId') teamId: string,
    @Param('adminId') adminId: string,
  ): Promise<User> {
    return this.teamService.addAdmin(teamId, adminId);
  }

  @Delete(':teamId/delete-member/:memberId')
  @ApiOperation({
    summary: 'Deletes team member. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiParam({
    name: 'memberId',
    required: true,
    description: 'Deleted member id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: null })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async deleteMember(
    @Param('teamId') teamId: string,
    @Param('memberId') memberId: string,
  ): Promise<void> {
    return await this.teamService.deleteMember(teamId, memberId);
  }

  @Delete(':teamId/delete-admin/:adminId')
  @ApiOperation({
    summary: 'Deletes team admin. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiParam({
    name: 'adminId',
    required: true,
    description: 'Deleted admin id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: null })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async deleteAdmin(
    @Param('teamId') teamId: string,
    @Param('adminId') adminId: string,
  ): Promise<void> {
    return await this.teamService.deleteAdmin(teamId, adminId);
  }

  @Post(':teamId/projects')
  @ApiOperation({
    summary: 'Creates new team project. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Project })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async createTeamProject(
    @Param('teamId') teamId: string,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return await this.teamService.createTeamProject(teamId, createProjectDto);
  }

  @Get(':teamId/projects')
  @ApiOperation({
    summary: 'Creates new team project. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Project })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async getTeamProjects(@Param('teamId') teamId: string): Promise<Project[]> {
    return await this.teamService.getTeamProjects(teamId);
  }

  @Delete(':teamId/projects/:projectId')
  @ApiOperation({
    summary: 'Creates new team project. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiParam({
    name: 'projectId',
    required: true,
    description: 'Project identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: null })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async deleteTeamProject(
    @Param('teamId') teamId: string,
    @Param('projectId') projectId: string,
  ): Promise<void> {
    return await this.teamService.deleteTeamProject(teamId, projectId);
  }

  @Delete(':teamId')
  @ApiOperation({
    summary: 'Deletes team. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  @IsUserRole(AdminRole.ADMIN)
  async deleteTeam(@Param('teamId') teamId: string): Promise<void> {
    await this.teamService.deleteTeam(teamId);
  }

  @Get()
  @ApiOperation({ summary: 'Gets all teams' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @IsUserRole(AdminRole.ADMIN)
  async getAllTeams(): Promise<Team[]> {
    return await this.teamService.getAllTeams();
  }

  @Get(':teamId')
  @ApiOperation({ summary: 'Gets teams by id' })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getTeam(@Param('teamId') teamId: string): Promise<Team> {
    return await this.teamService.findById(teamId);
  }

  @Patch(':teamId')
  @ApiOperation({
    summary: 'Updates team info. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(TeamRole.ADMIN)
  async updateTeam(
    @Param('teamId') teamId: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    return await this.teamService.updateTeam(teamId, updateTeamDto);
  }

  @Get('by-admin/:adminId')
  @ApiOperation({
    summary: 'Gets teams where user is admin',
  })
  @ApiParam({
    name: 'adminId',
    required: true,
    description: 'Admin identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Admin not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @IsUserRole(AdminRole.ADMIN)
  async findTeamsByAdminId(@Param('adminId') adminId: string): Promise<Team[]> {
    return await this.teamService.findTeamsByAdminId(adminId);
  }

  @Get('by-member/:memberId')
  @ApiOperation({
    summary: 'Gets user teams',
  })
  @ApiParam({
    name: 'memberId',
    required: true,
    description: 'User identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findTeamsByMemberId(
    @Param('memberId') memberId: string,
  ): Promise<Team[]> {
    return await this.teamService.findTeamsByMemberId(memberId);
  }
}
