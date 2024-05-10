import { action, computed, get, makeAutoObservable, observable } from 'mobx';
import { Team } from 'src/models/team.model';
import { User } from 'src/models/user.model';
import { CreateTeamDto } from 'src/dto/team/create-team.dto';
import { CreateProjectDto } from 'src/dto/project/create-project.dto';
import { Project } from 'src/models/project.model';

export class TeamStore {
  @observable error: Error | null = null;
  @observable isLoading = false;
  @observable currentTeam: Team = {
    id: 1,
    name: 'Team 1',
    description: 'Description for Team 1',
    admins: [
      { id: 3, username: 'alice_smith', email: 'alice@example.com' } as User,
      { id: 4, username: 'bob_jones', email: 'bob@example.com' } as User,
      { id: 5, username: 'alice_smith', email: 'alice@example.com' } as User,
      { id: 6, username: 'bob_jones', email: 'bob@example.com' } as User,
      { id: 7, username: 'alice_smith', email: 'alice@example.com' } as User,
      { id: 8, username: 'bob_jones', email: 'bob@example.com' } as User,
    ],
    members: [
      { id: 3, username: 'alice_smith', email: 'alice@example.com' } as User,
      { id: 4, username: 'bob_jones', email: 'bob@example.com' } as User,
      { id: 5, username: 'alice_smith', email: 'alice@example.com' } as User,
      { id: 6, username: 'bob_jones', email: 'bob@example.com' } as User,
      { id: 7, username: 'alice_smith', email: 'alice@example.com' } as User,
      { id: 8, username: 'bob_jones', email: 'bob@example.com' } as User,
    ],
    projects: [
      {
        id: 1,
        name: 'Project 1',
        description: 'Description for Project 1',
        startDate: new Date(),
        endDate: new Date('2024-05-15'),
        isCompleted: false,
        tasks: [],
      },
      {
        id: 2,
        name: 'Project 2',
        description: 'Description for Project 2',
        startDate: new Date(),
        endDate: new Date('2024-06-30'),
        isCompleted: true,
        tasks: [],
      },
    ],
  } as Team;

  constructor() {
    makeAutoObservable(this);
  }

  @computed
  isAdmin(user: User) {
    return this.currentTeam.admins.includes(user);
  }

  @computed
  isMember(user: User) {
    return this.currentTeam.members.includes(user);
  }

  @get
  async fetch(teamId: number) {
    return this.currentTeam;
  }

  @get
  getProjects() {
    return this.currentTeam.projects;
  }

  @action
  async createTeam(teamDto: CreateTeamDto) {
    this.isLoading = true;
    this.currentTeam = { ...teamDto } as Team;
    this.isLoading = false;
    return this.currentTeam;
  }

  @action
  async createProject(projectDto: CreateProjectDto) {
    this.isLoading = true;
    this.currentTeam.projects.push({ ...projectDto } as Project);
    this.isLoading = false;
    return this.currentTeam.projects;
  }

  @action
  async deleteProject(projectId: number) {
    this.isLoading = true;
    const newArray = this.currentTeam.projects.filter(project => project.id !== projectId);
    this.currentTeam.projects = newArray;
    this.isLoading = false;
    return newArray;
  }

  @action
  async addMember(user: User) {
    this.isLoading = true;
    if (!this.isMember(user)) {
      this.currentTeam.members.push(user);
      this.isLoading = false;
      return user;
    } else {
      this.error = new Error('User already in team');
      this.isLoading = false;
    }
  }

  @action
  async addAdmin(user: User) {
    this.isLoading = true;
    if (!this.isAdmin(user)) {
      this.currentTeam.admins.push(user);
      this.isLoading = false;
      return user;
    } else {
      this.error = new Error('User already is admin');
      this.isLoading = false;
    }
  }


}
