import { makeAutoObservable } from 'mobx';
import { Team } from 'src/models/team.model';
import { User } from 'src/models/user.model';
import { CreateTeamDto } from 'src/services/dto/team/create-team.dto';
import { CreateProjectDto } from 'src/services/dto/project/create-project.dto';
import { Project } from 'src/models/project.model';
import TeamService from 'src/services/team.service';

export class TeamStore {
  error: Error | null = null;
  isLoading = false;
  currentTeam: Team = {
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
  teamService: TeamService;

  constructor(teamService: TeamService) {
    this.teamService = teamService;
    makeAutoObservable(this);
  }

  isAdmin(user: User) {
    return !!this.currentTeam.admins.find(admin => admin.id === user.id);
  }

  isMember(user: User) {
    return this.currentTeam.members.find(member => member.id === user.id);
  }

  getUserById(id: number) {
    return this.currentTeam.members.find(member => member.id === id);
  }

  async fetch(teamId: number) {
    return this.currentTeam;
  }

  getProjects() {
    return this.currentTeam.projects;
  }

  async createTeam(teamDto: CreateTeamDto) {
    this.isLoading = true;
    this.currentTeam = { ...teamDto } as Team;
    this.isLoading = false;
    return this.currentTeam;
  }

  async createProject(projectDto: CreateProjectDto) {
    this.isLoading = true;
    this.currentTeam.projects.push({ ...projectDto } as Project);
    this.isLoading = false;
    return this.currentTeam.projects;
  }

  async deleteProject(projectId: number) {
    this.isLoading = true;
    const newArray = this.currentTeam.projects.filter(project => project.id !== projectId);
    this.currentTeam.projects = newArray;
    this.isLoading = false;
    return newArray;
  }

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

  async deleteUser(userId: number): Promise<void> {
    this.isLoading = true;
    const user = this.getUserById(userId);
    if (user && !this.isAdmin(user)) {
      this.currentTeam.members = this.currentTeam.members.filter(member => member.id !== userId);
      this.isLoading = false;
      return;
    }
    if (user && this.isAdmin(user)) {
      this.error = new Error('This user has admin privilege');
      this.isLoading = false;
    } else {
      this.error = new Error('User does not exist');
      this.isLoading = false;
    }

  }

  async deleteAdmin(userId: number): Promise<void> {
    this.isLoading = true;
    const user = this.getUserById(userId);
    if (user && this.isAdmin(user)) {
      this.currentTeam.admins = this.currentTeam.admins.filter(admin => admin.id !== userId);
      this.isLoading = false;
      return;
    }
    if (user && !this.isAdmin(user)) {
      this.error = new Error('This user has no admin privilege');
      this.isLoading = false;
    } else {
      this.error = new Error('User does not exist');
      this.isLoading = false;
    }
  }
}
