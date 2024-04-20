import { Project } from 'src/project/entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from 'src/team/entities/team.entity';
import { Task } from 'src/entities/task.entity';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>,
  ) {}

  async createProject(projectData: Partial<Project>): Promise<Project> {
    const project = this.repository.create(projectData);
    return await this.repository.save(project);
  }

  async updateProject(
    id: number,
    projectData: Partial<Project>,
  ): Promise<Project> {
    await this.repository.update(id, projectData);
    return await this.repository.findOneBy({ id });
  }

  async deleteProject(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findProjectById(id: number): Promise<Project> {
    return await this.repository.findOneBy({ id });
  }

  async findAllProjects(): Promise<Project[]> {
    return await this.repository.find();
  }

  async assignProjectToTeam(projectId: number, team: Team): Promise<Project> {
    const project = await this.findProjectById(projectId);
    project.team = team;
    return await this.repository.save(project);
  }

  async findProjectsByTeam(teamId: number): Promise<Project[]> {
    return await this.repository.find({ where: { team: { id: teamId } } });
  }

  async addTaskToProject(id: number, ...tasks: Task[]): Promise<void> {
    const project = await this.findProjectById(id);
    project.tasks.push(...tasks);
    await this.repository.save(project);
  }

  async removeTaskFromProject(id: number, taskId: number): Promise<void> {
    const project = await this.findProjectById(id);
    project.tasks = project.tasks.filter(task => task.id !== taskId);
    await this.repository.save(project);
  }

  async findTasksByProject(id: number): Promise<Task[]> {
    const project = await this.repository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    return project.tasks;
  }
}
