import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { UserRepository } from '../user/user.repository';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const admin = await this.userRepository.findById(createTeamDto.adminId);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return await this.teamRepository.createTeam(
      createTeamDto.name,
      createTeamDto.description,
      [admin],
    );
  }

  async joinTeam(userId: number, teamId: number): Promise<Team> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    if (team.members.some(member => member.id === userId)) {
      throw new BadRequestException('User is already a member of the team');
    }
    team.members.push(user);
    return this.teamRepository.save(team);
  }

  async leaveTeam(userId: number, teamId: number): Promise<Team> {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    team.members = team.members.filter(member => member.id !== userId);
    return this.teamRepository.save(team);
  }

  async addMember(teamId: number, memberId: number): Promise<Team> {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    const member = await this.userRepository.findById(memberId);
    if (!member) {
      throw new NotFoundException('User not found');
    }
    if (team.members.some(m => m.id === memberId)) {
      throw new BadRequestException('User is already a member of the team');
    }
    team.members.push(member);
    return this.teamRepository.save(team);
  }

  async addAdmin(teamId: number, adminId: number): Promise<Team> {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    const admin = await this.userRepository.findById(adminId);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    if (!team.members.some(m => m.id === adminId)) {
      throw new BadRequestException(
        'User must be a member of the team to be an admin',
      );
    }
    if (team.admins.some(a => a.id === adminId)) {
      throw new BadRequestException('User is already an admin of the team');
    }
    team.admins.push(admin);
    return this.teamRepository.save(team);
  }
}
