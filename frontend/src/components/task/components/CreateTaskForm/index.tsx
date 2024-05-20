import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { styles } from 'src/components/modalForm/styles';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { CreateTaskDto } from 'src/services/dto/task/create-task.dto';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { observer } from 'mobx-react';

interface CreateTaskFormProps {
  onSubmit: (newTask: CreateTaskDto) => void;
  tasks: Task[],
  members?: User[],
  onCancel: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ tasks, members, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateTaskDto>({
    name: '',
    description: '',
    urgency: false,
    importance: false,
    startDate: new Date(),
    endDate: new Date(),
    dependencies: [],
  });

  const selectStyle = {
    maxHeight: 224,
    width: 250,
  };

  const handleDependencyChange = (event: SelectChangeEvent<Task[]>) => {
    const dependencies = [...event.target.value as Task[]];
    //const taskDeps = taskStore.getTaskArrayByIds(dependencies);
    setFormData({ ...formData, dependencies });
  };

  const handleUserChange = (event: SelectChangeEvent<User>) => {
    //const user = userStore.getUserById(event.target.value);
    setFormData({ ...formData, user: event.target.value as User });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" gutterBottom>
        Create Task
      </Typography>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="name">Task name</InputLabel>
        <Input
          id="name"
          type="text"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          value={formData.name}
        />
      </FormControl>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="description">Task description</InputLabel>
        <Input
          id="description"
          type="text"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          value={formData.description}
        />
      </FormControl>
      <FormControl sx={styles.form}>
        <FormControlLabel control={<Checkbox
          id="urgency"
          onChange={(e) => setFormData({ ...formData, urgency: e.target.checked })}
          checked={formData.urgency}
        />} label="Urgency" />

      </FormControl>
      <FormControl sx={styles.form}>
        <FormControlLabel control={<Checkbox
          id="importance"
          onChange={(e) => setFormData({ ...formData, importance: e.target.checked })}
          checked={formData.importance}
        />} label="Importance" />
      </FormControl>
      <FormControl sx={styles.form}>
        <DatePicker
          label="Start date"
          onChange={(newValue) =>
            setFormData({ ...formData, startDate: newValue?.toDate() ?? formData.startDate })
          }
          value={dayjs(formData.startDate)}
        />
      </FormControl>
      <FormControl sx={styles.form}>
        <DatePicker
          label="End date"
          onChange={(newValue) =>
            setFormData({ ...formData, endDate: newValue?.toDate() ?? formData.endDate })
          }
          value={dayjs(formData.endDate)}
        />
      </FormControl>
      <FormControl sx={styles.form}>
        <InputLabel id="dependencies-label">Dependencies</InputLabel>
        <Select
          labelId="dependencies-label"
          id="dependencies"
          multiple
          value={formData.dependencies}
          onChange={handleDependencyChange}
          input={<Input />}
          MenuProps={{
            PaperProps: {
              style: selectStyle,
            },
          }}
        >
          {tasks.map((task) => (
            <MenuItem key={task.id} value={task.id}>
              {task.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {members ? <FormControl sx={styles.form}>
        <InputLabel id="users-label">Assigned Users</InputLabel>
        <Select
          labelId="users-label"
          label="Assigned User"
          id="assigned-users"
          value={formData.user}
          onChange={handleUserChange}
          input={<Input />}
          MenuProps={{
            PaperProps: {
              style: selectStyle,
            },
          }}
        >
          {members.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl> : <></>}
      <Box sx={styles.buttonContainer}>
        <Button variant="contained" color="primary" type="submit">
          Create
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default observer(CreateTaskForm);
