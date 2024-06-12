import React from 'react';
import {
  Box,
  OutlinedInput,
  MenuItem,
  Select,
  Chip,
  SelectChangeEvent,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Task } from 'src/models/task.model';
import { observer } from 'mobx-react';
import { TaskDto } from 'src/services/dto/task.dto';

interface DependencySelectorProps {
  tasks: Task[];
  formData: TaskDto;
  handleChange: (event: SelectChangeEvent<Task[]>) => Promise<void>;
  handleDependencyDelete: (task: Task) => void;
}

const selectStyle = {
  maxHeight: 224,
  width: 250,
};

const DependencySelector: React.FC<DependencySelectorProps> = ({
  tasks,
  formData,
  handleChange,
  handleDependencyDelete,
}) => (
  <Select
    labelId="dependencies-label"
    id="dependencies"
    multiple
    value={formData.dependencies}
    onChange={handleChange}
    input={<OutlinedInput label="Dependencies" />}
    renderValue={(selected) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.map((task) => (
          <Chip
            key={task.id}
            label={task.name}
            onDelete={() => handleDependencyDelete(task)}
            deleteIcon={
              <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
            }
          />
        ))}
      </Box>
    )}
    MenuProps={{
      PaperProps: {
        style: selectStyle,
      },
    }}
  >
    <MenuItem disabled value="">
      Dependency
    </MenuItem>
    {tasks.map((task) => (
      <MenuItem key={task.id} value={task as unknown as string}>
        {task.name}
      </MenuItem>
    ))}
  </Select>
);

export default observer(DependencySelector);
