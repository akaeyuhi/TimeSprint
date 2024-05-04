import { makeAutoObservable } from 'mobx';
import { Project } from 'src/models/project.model';

export class ProjectStore {
  projects: Project[] = [
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
    }, {
      id: 3,
      name: 'Project 3',
      description: 'Description for Project 3',
      startDate: new Date(),
      endDate: new Date('2024-05-15'),
      isCompleted: false,
      tasks: [],
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
