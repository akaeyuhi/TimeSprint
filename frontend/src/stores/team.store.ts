import { makeAutoObservable } from 'mobx';
import { Team } from 'src/models/team.model';
import { User } from 'src/models/user.model';

export class TeamStore {
  teams: Team[] = [
    {
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
    },
    {
      id: 2,
      name: 'Team 2',
      description: 'Description for Team 2',
      admins: [
        { id: 3, username: 'alice_smith', email: 'alice@example.com' } as User,
        { id: 4, username: 'bob_jones', email: 'bob@example.com' } as User,
      ],
      members: [
        { id: 3, username: 'alice_smith', email: 'alice@example.com' } as User,
        { id: 4, username: 'bob_jones', email: 'bob@example.com' } as User,
      ],
      projects: [{
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
      }],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}
