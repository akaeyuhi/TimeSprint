import { makeAutoObservable } from 'mobx';
import { Project } from 'src/models/project.model';
import { User } from 'src/models/user.model';
import { AdminRole } from 'src/models/roles.enum';

export class ProjectStore {
  projects: Project[] = [
    {
      id: 1,
      name: 'Project 1',
      description: 'Description for Project 1',
      startDate: new Date(),
      endDate: new Date('2024-05-15'),
      isCompleted: false,
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          description: 'Description for Task 1',
          urgency: true,
          importance: false,
          startDate: new Date('2024-04-20'),
          endDate: new Date('2024-04-25'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 1,
            username: 'user1',
            email: 'user1@example.com',
            role: 'USER'
          } as unknown as User,
        },
        {
          id: 2,
          name: 'Task 2',
          description: 'Description for Task 2',
          urgency: false,
          importance: true,
          startDate: new Date('2024-04-22'),
          endDate: new Date('2024-04-27'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 2,
            username: 'user2',
            email: 'user2@example.com',
            role: 'USER'
          } as unknown as User,
        },
        {
          id: 3,
          name: 'Task 3',
          description: 'Description for Task 3',
          urgency: true,
          importance: true,
          startDate: new Date('2024-04-23'),
          endDate: new Date('2024-04-28'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 3,
            username: 'user3',
            email: 'user3@example.com',
            role: 'USER'
          } as unknown as User,
        },
        {
          id: 4,
          name: 'Task 4',
          description: 'Description for Task 4',
          urgency: false,
          importance: false,
          startDate: new Date('2024-04-24'),
          endDate: new Date('2024-04-29'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 4,
            username: 'user4',
            email: 'user4@example.com',
            role: AdminRole.USER
          } as User,
        },
        {
          id: 5,
          name: 'Task 5',
          description: 'Description for Task 5',
          urgency: true,
          importance: false,
          startDate: new Date('2024-04-25'),
          endDate: new Date('2024-04-30'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 5,
            username: 'user5',
            email: 'user5@example.com',
            role: AdminRole.USER
          } as User,
        },
        // Add more mock tasks as needed
      ],
    },
    {
      id: 2,
      name: 'Project 2',
      description: 'Description for Project 2',
      startDate: new Date(),
      endDate: new Date('2024-06-30'),
      isCompleted: true,
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          description: 'Description for Task 1',
          urgency: true,
          importance: false,
          startDate: new Date('2024-04-20'),
          endDate: new Date('2024-04-25'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 1,
            username: 'user1',
            email: 'user1@example.com',
            role: 'USER'
          } as unknown as User,
        },
        {
          id: 2,
          name: 'Task 2',
          description: 'Description for Task 2',
          urgency: false,
          importance: true,
          startDate: new Date('2024-04-22'),
          endDate: new Date('2024-04-27'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 2,
            username: 'user2',
            email: 'user2@example.com',
            role: 'USER'
          } as unknown as User,
        },
        {
          id: 3,
          name: 'Task 3',
          description: 'Description for Task 3',
          urgency: true,
          importance: true,
          startDate: new Date('2024-04-23'),
          endDate: new Date('2024-04-28'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 3,
            username: 'user3',
            email: 'user3@example.com',
            role: 'USER'
          } as unknown as User,
        },
        {
          id: 4,
          name: 'Task 4',
          description: 'Description for Task 4',
          urgency: false,
          importance: false,
          startDate: new Date('2024-04-24'),
          endDate: new Date('2024-04-29'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 4,
            username: 'user4',
            email: 'user4@example.com',
            role: AdminRole.USER
          } as User,
        },
        {
          id: 5,
          name: 'Task 5',
          description: 'Description for Task 5',
          urgency: true,
          importance: false,
          startDate: new Date('2024-04-25'),
          endDate: new Date('2024-04-30'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 5,
            username: 'user5',
            email: 'user5@example.com',
            role: AdminRole.USER
          } as User,
        },
        // Add more mock tasks as needed
      ],
    }, {
      id: 3,
      name: 'Project 3',
      description: 'Description for Project 3',
      startDate: new Date(),
      endDate: new Date('2024-05-15'),
      isCompleted: false,
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          description: 'Description for Task 1',
          urgency: true,
          importance: false,
          startDate: new Date('2024-04-20'),
          endDate: new Date('2024-04-25'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 1,
            username: 'user1',
            email: 'user1@example.com',
            role: 'USER'
          } as unknown as User,
        },
        {
          id: 2,
          name: 'Task 2',
          description: 'Description for Task 2',
          urgency: false,
          importance: true,
          startDate: new Date('2024-04-22'),
          endDate: new Date('2024-04-27'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 2,
            username: 'user2',
            email: 'user2@example.com',
            role: 'USER'
          } as unknown as User,
        },
        {
          id: 3,
          name: 'Task 3',
          description: 'Description for Task 3',
          urgency: true,
          importance: true,
          startDate: new Date('2024-04-23'),
          endDate: new Date('2024-04-28'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 3,
            username: 'user3',
            email: 'user3@example.com',
            role: 'USER'
          } as unknown as User,
        },
        {
          id: 4,
          name: 'Task 4',
          description: 'Description for Task 4',
          urgency: false,
          importance: false,
          startDate: new Date('2024-04-24'),
          endDate: new Date('2024-04-29'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 4,
            username: 'user4',
            email: 'user4@example.com',
            role: AdminRole.USER
          } as User,
        },
        {
          id: 5,
          name: 'Task 5',
          description: 'Description for Task 5',
          urgency: true,
          importance: false,
          startDate: new Date('2024-04-25'),
          endDate: new Date('2024-04-30'),
          isCompleted: false,
          dependencies: [],
          user: {
            id: 5,
            username: 'user5',
            email: 'user5@example.com',
            role: AdminRole.USER
          } as User,
        },
        // Add more mock tasks as needed
      ],
    },
    {
      id: 4,
      name: 'Project 4',
      description: 'Description for Project 2',
      startDate: new Date(),
      endDate: new Date('2024-06-30'),
      isCompleted: true,
      tasks: [],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}
