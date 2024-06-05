import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { Task } from 'src/models/task.model';
import { SortBy, useSorting } from 'src/hooks/use-sorting';
import { observer } from 'mobx-react';

interface TaskSorterProps {
  tasks: Task[];
  onSort: (tasks: Task[]) => void;
  isEditable: boolean;
  isProjectPage: boolean;
  handleGetImportantTasks?: () => Promise<void>;
}

const TaskSorter: React.FC<TaskSorterProps> = ({
  tasks,
  onSort,
  isEditable,
  isProjectPage,
  handleGetImportantTasks,
}) => {
  const [sortBy, setSorting, sorted] = useSorting(tasks);

  const onChange = (e: SelectChangeEvent) => {
    setSorting(e.target.value as SortBy);
  };

  useEffect(() => onSort(sorted), [sorted]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <FormControl>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          label="Sort By"
          id="sort-by"
          value={sortBy}
          onChange={onChange}
          sx={{ width: 150 }}
        >

          <MenuItem value={SortBy.NAME}>Name</MenuItem>
          <MenuItem value={SortBy.URGENCY}>Urgency</MenuItem>
          <MenuItem value={SortBy.IMPORTANCE}>Importance</MenuItem>
          <MenuItem value={SortBy.DEADLINE}>Deadline</MenuItem>
        </Select>
      </FormControl>
      <Box>
        {(isEditable && !isProjectPage) && (
          <Button variant="contained" onClick={handleGetImportantTasks}>
            Get Important Tasks
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default observer(TaskSorter);
