import { useEffect, useState } from 'react';
import { Task } from 'src/models/task.model';

export enum SortBy {
  EMPTY = '',
  NAME = 'name',
  URGENCY = 'urgency',
  IMPORTANCE = 'importance',
  DEADLINE = 'deadline',
  COMPLETED = 'completed',
  UNCOMPLETED = 'uncompleted'
}

export const useSorting = (initialTasks: Task[]) => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);
  const [sorted, setSorted] = useState<Task[]>(initialTasks);

  useEffect(() => {
    const sortedTasks = [...initialTasks];
    switch (sortBy) {
    case SortBy.NAME:
      sortedTasks.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case SortBy.URGENCY:
      sortedTasks.sort((a, b) => Number(a.urgency) - Number(b.urgency));
      break;
    case SortBy.IMPORTANCE:
      sortedTasks.sort((a, b) => Number(a.importance) - Number(b.importance));
      break;
    case SortBy.DEADLINE:
      sortedTasks.sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
      break;
    }
    setSorted(sortedTasks);
  }, [sortBy, initialTasks]);

  const setSorting = (sort: SortBy) => {
    setSortBy(sort);
  };

  return [sortBy, setSorting, sorted] as const;
};
