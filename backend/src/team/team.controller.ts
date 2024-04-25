import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  Patch,
  Get,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateTeamDto } from 'src/team/dto/update-team.dto';
import { TeamRolesGuard } from 'src/team/guards/team.guard';
import { TeamRoles } from 'src/team/decorators/team.decorator';
import { UserRole } from 'src/user/utils';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Teams')
@ApiBearerAuth('JWT')
@Controller('teams')
@UseGuards(JwtAuthGuard, TeamRolesGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new team.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.createTeam(createTeamDto);
  }

  @Put(':id/join')
  @ApiOperation({ summary: 'Joins to the team by id.' })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async joinTeam(
    @Param('id') teamId: number,
    @Body() user: User,
  ): Promise<Team> {
    return this.teamService.joinTeam(user.id, teamId);
  }

  @Put(':id/leave')
  @ApiOperation({ summary: 'Leaves the team by id.' })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async leaveTeam(
    @Param('id') teamId: number,
    @Body() user: User,
  ): Promise<Team> {
    return this.teamService.leaveTeam(user.id, teamId);
  }

  @Put(':id/add-member/:memberId')
  @ApiOperation({
    summary: 'Adds new member to the team. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiParam({ name: 'memberId', required: true, description: 'New member id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(UserRole.ADMIN)
  async addMember(
    @Param('id') teamId: number,
    @Param('memberId') memberId: number,
  ): Promise<Team> {
    return this.teamService.addMember(teamId, memberId);
  }

  @Put(':id/add-admin/:adminId')
  @ApiOperation({
    summary: 'Adds new team admin. Team admin rights required.',
  })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiParam({ name: 'adminId', required: true, description: 'New admin id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Team not found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @TeamRoles(UserRole.ADMIN)
  async addAdmin(
    @Param('id') teamId: number,
    @Param('adminId') adminId: number,
  ): Promise<Team> {
    return this.teamService.addAdmin(teamId, adminId);
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
  @TeamRoles(UserRole.ADMIN)
  async deleteTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<void> {
    await this.teamService.deleteTeam(teamId);
  }

  @Get()
  @ApiOperation({ summary: 'Gets all teams' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getAllTeams(): Promise<Team[]> {
    return await this.teamService.getAllTeams();
  }

  @Get(':teamId')
  @ApiOperation({ summary: 'Gets teams by id' })
  @ApiParam({ name: 'teamId', required: true, description: 'Team identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Team })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getTeam(@Param('teamId', ParseIntPipe) teamId: number): Promise<Team> {
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
  @TeamRoles(UserRole.ADMIN)
  async updateTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
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
  async findTeamsByAdminId(
    @Param('adminId', ParseIntPipe) adminId: number,
  ): Promise<Team[]> {
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
    @Param('memberId', ParseIntPipe) memberId: number,
  ): Promise<Team[]> {
    return await this.teamService.findTeamsByMemberId(memberId);
  }
}
