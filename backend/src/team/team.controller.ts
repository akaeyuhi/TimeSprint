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
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateTeamDto } from 'src/team/dto/update-team.dto';
import { TeamRolesGuard } from 'src/team/guards/team.guard';
import { TeamRoles } from 'src/team/decorators/team.decorator';
import { UserRole } from 'src/user/utils';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.createTeam(createTeamDto);
  }

  @Put(':id/join')
  async joinTeam(
    @Param('id') teamId: number,
    @Body() user: User,
  ): Promise<Team> {
    return this.teamService.joinTeam(user.id, teamId);
  }

  @Put(':id/leave')
  async leaveTeam(
    @Param('id') teamId: number,
    @Body() user: User,
  ): Promise<Team> {
    return this.teamService.leaveTeam(user.id, teamId);
  }

  @Put(':id/add-member/:memberId')
  @UseGuards(TeamRolesGuard)
  @TeamRoles(UserRole.ADMIN)
  async addMember(
    @Param('id') teamId: number,
    @Param('memberId') memberId: number,
  ): Promise<Team> {
    return this.teamService.addMember(teamId, memberId);
  }

  @Put(':id/add-admin/:adminId')
  @UseGuards(TeamRolesGuard)
  @TeamRoles(UserRole.ADMIN)
  async addAdmin(
    @Param('id') teamId: number,
    @Param('adminId') adminId: number,
  ): Promise<Team> {
    return this.teamService.addAdmin(teamId, adminId);
  }

  @Delete(':teamId')
  @UseGuards(TeamRolesGuard)
  @TeamRoles(UserRole.ADMIN)
  async deleteTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<void> {
    await this.teamService.deleteTeam(teamId);
  }

  @Get()
  async getAllTeams(): Promise<Team[]> {
    return await this.teamService.getAllTeams();
  }

  @Patch(':teamId')
  @UseGuards(TeamRolesGuard)
  @TeamRoles(UserRole.ADMIN)
  async updateTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    return await this.teamService.updateTeam(teamId, updateTeamDto);
  }

  @Get('by-admin/:adminId')
  async findTeamsByAdminId(
    @Param('adminId', ParseIntPipe) adminId: number,
  ): Promise<Team[]> {
    return await this.teamService.findTeamsByAdminId(adminId);
  }

  @Get('by-member/:memberId')
  async findTeamsByMemberId(
    @Param('memberId', ParseIntPipe) memberId: number,
  ): Promise<Team[]> {
    return await this.teamService.findTeamsByMemberId(memberId);
  }
}
