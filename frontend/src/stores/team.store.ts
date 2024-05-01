import { makeAutoObservable } from 'mobx';
import { Team } from 'src/models/team.model';

export class TeamStore {
  teams: Team[] = [
    { id: 1,
      name: 'Team 1',
      description: 'Description for Team 1',
      admins: [],
      members: [],
      projects: []
    },
    { id: 2,
      name: 'Team 2',
      description: 'Description for Team 2',
      admins: [],
      members: [],
      projects: [] },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}
