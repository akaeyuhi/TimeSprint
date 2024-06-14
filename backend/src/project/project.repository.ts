import { Project } from 'src/project/entities/project.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from 'src/team/entities/team.entity';
import { Task } from 'src/task/entities/task.entity';
import { IRepository } from 'src/interfaces/repository.interface';

@Injectable()
export class ProjectRepository implements IRepository<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>,
  ) {}

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.repository.create({ ...projectData, tasks: [] });
    return await this.repository.save(project);
  }

  async update(id: string, projectData: Partial<Project>): Promise<Project> {
    const project = await this.findById(id);
    if (!project) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.repository.update(id, projectData);
    return { ...project, ...projectData };
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Project> {
    return await this.repository.findOne({
      where: { id },
      relations: {
        team: true,
        tasks: {
          dependencies: true,
        },
      },
    });
  }

  async findAll(): Promise<Project[]> {
    return await this.repository.find({ relations: ['team', 'tasks'] });
  }

  async assignProjectToTeam(projectId: string, team: Team): Promise<Project> {
    const project = await this.findById(projectId);
    project.team = team;
    return await this.repository.save(project);
  }

  async findProjectsByTeam(teamId: string): Promise<Project[]> {
    return await this.repository.find({ where: { team: { id: teamId } } });
  }

  async addTaskToProject(id: string, ...tasks: Task[]): Promise<void> {
    const project = await this.findById(id);
    project.tasks.push(...tasks);
    await this.repository.save(project);
  }

  async removeTaskFromProject(id: string, taskId: string): Promise<void> {
    const project = await this.findById(id);
    project.tasks = project.tasks.filter(task => task.id !== taskId);
    await this.repository.save(project);
  }

  async findTasksByProject(id: string): Promise<Task[]> {
    const project = await this.repository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    return project.tasks;
  }
}
