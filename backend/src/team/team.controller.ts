import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';

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
  async addMember(
    @Param('id') teamId: number,
    @Param('memberId') memberId: number,
  ): Promise<Team> {
    return this.teamService.addMember(teamId, memberId);
  }

  @Put(':id/add-admin/:adminId')
  async addAdmin(
    @Param('id') teamId: number,
    @Param('adminId') adminId: number,
  ): Promise<Team> {
    return this.teamService.addAdmin(teamId, adminId);
  }
}
