import React, { useMemo, useState } from 'react';
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

type ReturnType = [SortBy, React.Dispatch<React.SetStateAction<SortBy>>, Task[]]

export const useSorting = (tasks: Task[]): ReturnType => {
  const [sortingBy, setSortingBy] = useState<SortBy>(SortBy.EMPTY);
  const sorted = useMemo(() => {
    switch (sortingBy) {
    case SortBy.NAME:
      return tasks.slice().sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    case SortBy.URGENCY:
      return tasks.slice().sort((b, a) =>
        (Number(a.urgency) - Number(b.urgency)));
    case SortBy.IMPORTANCE:
      return tasks.slice().sort((b, a) =>
        (Number(a.importance) - Number(b.importance)));
    case SortBy.DEADLINE:
      return tasks.slice().sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
    default:
      return tasks;
    }
  }, [sortingBy, tasks]);

  return [sortingBy, setSortingBy, sorted];
};
