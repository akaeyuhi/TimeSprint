import { Team } from './entities/team.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository } from 'src/interfaces/repository.interface';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class TeamRepository implements IRepository<Team> {
  constructor(
    @InjectRepository(Team)
    private readonly repository: Repository<Team>,
  ) {}
  async findAll(): Promise<Team[]> {
    return this.repository.find({
      relations: ['members', 'admins', 'projects'],
    });
  }

  async findById(id: number): Promise<Team> {
    return this.repository.findOne({
      where: { id },
      relations: ['members', 'admins', 'projects'],
    });
  }

  async create(createTeamDto: Partial<Team>): Promise<Team> {
    const team = this.repository.create(createTeamDto);
    return this.repository.save(team);
  }

  async update(id: number, updateTeamDto: Partial<Team>): Promise<Team> {
    const team = await this.findById(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    await this.repository.update(id, updateTeamDto);
    return { ...team, ...updateTeamDto };
  }

  async delete(id: number): Promise<void> {
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

  async getTeamIdByProject(projectId: number): Promise<number> {
    const team = await this.repository
      .createQueryBuilder('team')
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

  async addMember(team: Team, user: User): Promise<Team> {
    team.members.push(user);
    return await this.repository.save(team);
  }

  async addAdmin(team: Team, user: User): Promise<Team> {
    team.admins.push(user);
    return await this.repository.save(team);
  }

  async addProjectToTeam(team: Team, project: Project) {
    team.projects.push(project);
    return this.repository.save(team);
  }

  async deleteAdmin(team: Team, user: User): Promise<Team> {
    team.admins = team.admins.filter(admin => admin.id !== user.id);
    return await this.repository.save(team);
  }

  async deleteMember(team: Team, user: User): Promise<Team> {
    team.members = team.members.filter(member => member.id !== user.id);
    return await this.repository.save(team);
  }
}
