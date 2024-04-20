import { Team } from './entities/team.entity';
import { User } from '../user/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectRepository(Team)
    private readonly repository: Repository<Team>,
  ) {}
  async findAll(): Promise<Team[]> {
    return this.repository.find({ relations: ['members', 'admins'] });
  }

  async findById(id: number): Promise<Team> {
    return this.repository.findOneBy({ id });
  }

  async createTeam(
    name: string,
    description: string,
    admins: User[],
  ): Promise<Team> {
    const team = this.repository.create({ name, description, admins });
    return this.repository.save(team);
  }

  async updateTeam(
    id: number,
    name: string,
    description: string,
  ): Promise<Team> {
    const team = await this.findById(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    team.name = name;
    team.description = description;
    return this.repository.save(team);
  }

  async deleteTeam(id: number): Promise<void> {
    const team = await this.findById(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    await this.repository.remove(team);
  }

  async findByAdmin(adminId: number): Promise<Team[]> {
    return this.repository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.admins', 'admin')
      .where('admin.id = :adminId', { adminId })
      .getMany();
  }

  async findByMember(memberId: number): Promise<Team[]> {
    return this.repository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'member')
      .where('member.id = :memberId', { memberId })
      .getMany();
  }

  save(entity: Team) {
    return this.repository.save(entity);
  }

  async getTeamIdByProject(projectId: number): Promise<number> {
    const team = await this.repository.createQueryBuilder('team')
      .innerJoin('team.projects', 'project')
      .where('project.id = :projectId', { projectId })
      .getOne();

    if (!team) {
      throw new NotFoundException(
        `Team associated with project ID ${projectId} not found`,
      );
    }

    return team.id;
  }

  async getUserRoleInTeam(userId: number, teamId: number): Promise<string> {
    const team = await this.repository.findOne({
      where: { id: userId },
      relations: ['users'],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    const user = team.members.find(user => user.id === userId);

    if (!user) {
      return null; // User is not a member of the team
    }

    return user.role;
  }
}
