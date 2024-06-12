import React, { useEffect, useState } from 'react';
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
import { observer } from 'mobx-react';
import { SortBy } from 'src/utils/common/sortBy';

interface TaskSorterProps {
  tasks: Task[];
  onSort: (sortBy: SortBy) => void;
  isEditable: boolean;
  isProjectPage: boolean;
  handleGetImportantTasks?: () => Promise<void>;
}

const TaskSort: React.FC<TaskSorterProps> = ({
  onSort,
  isEditable,
  isProjectPage,
  handleGetImportantTasks,
}) => {
  const [sortBy, setSortBy] = useState(SortBy.EMPTY);

  const onChange = (e: SelectChangeEvent) => {
    setSortBy(e.target.value as SortBy);
  };

  useEffect(() => {
    onSort(sortBy);
  }, [onSort, sortBy]);

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

export default observer(TaskSort);
