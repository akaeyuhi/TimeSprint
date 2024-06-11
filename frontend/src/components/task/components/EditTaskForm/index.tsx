import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel, FormHelperText,
  InputLabel,
  MenuItem, OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { styles } from 'src/components/modalForm/styles';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Task } from 'src/models/task.model';
import { UpdateTaskDto } from 'src/services/dto/task/update-task.dto';
import { User } from 'src/models/user.model';
import { observer } from 'mobx-react';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';

interface EditTaskFormProps {
  task: Task | null,
  members?: User[],
  onSubmit: (taskId: number, updatedTask: UpdateTaskDto) => void,
  onCancel: () => void,
  tasks: Task[]
}

const validate = (state: UpdateTaskDto): ValidationErrors<UpdateTaskDto> => ({
  name: !(state.name && state.name.length > 8),
  description: !(state.description && state.description.length > 20),
  urgency: true,
  importance: true,
  startDate: !(state.endDate && state.startDate && state.startDate < state.endDate),
  endDate: !(state.endDate && state.startDate && state.startDate < state.endDate),
  dependencies: !!state.dependencies
});

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  members,
  onSubmit,
  onCancel,
  tasks,
}) => {
  const [formData, setFormData, errors] = useValidation<UpdateTaskDto>({
    name: task?.name ?? '',
    description: task?.description ?? '',
    urgency: task?.urgency ?? false,
    importance: task?.importance ?? false,
    startDate: task?.startDate ?? new Date(),
    endDate: task?.endDate ?? new Date(),
    dependencies: task?.dependencies ?? [],
    user: task?.user,
  }, validate);

  const selectStyle = {
    maxHeight: 224,
    width: 250,
  };

  const isValid = !(errors.name && errors.description && errors.endDate && errors.startDate);

  const handleDependencyChange = async (event: SelectChangeEvent) => {
    const task = tasks.find(task => task.id === Number(event.target.value));
    if (!task) return;
    const dependencies = [...task.dependencies as [], task];
    setFormData('dependencies', dependencies);
  };

  const handleUserChange = async (event: SelectChangeEvent) => {
    if (!members) return;
    const user = members.find(member => member.username === event.target.value);
    if (user) setFormData('user', user);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid)
      onSubmit(Number(task?.id), {
        ...formData,
      });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" gutterBottom mb={2}>
        Edit Task
      </Typography>
      <FormControl error={errors.name}>
        <InputLabel htmlFor="name">Task name</InputLabel>
        <OutlinedInput
          id="name"
          type="text"
          label="Task name"
          onChange={(e) => setFormData('name', e.target.value)}
          required
          aria-describedby="name-error"
          value={formData.name}
        />
        {errors.name && <FormHelperText error id="name-error">
          Name should be 8 characters long
        </ FormHelperText>}
      </FormControl>
      <FormControl error={errors.description}>
        <InputLabel htmlFor="description">Task description</InputLabel>
        <OutlinedInput
          id="description"
          type="text"
          label="Task description"
          aria-describedby="desc-error"
          onChange={(e) => setFormData('description', e.target.value)}
          required
          value={formData.description}
        />
        {errors.description && <FormHelperText error id="desc-error">
          Description should be 20 characters long
        </ FormHelperText>}
      </FormControl>
      <FormControl>
        <FormControlLabel control={<Checkbox
          id="urgency"
          onChange={(e) => setFormData('urgency', e.target.checked)}
          checked={formData.urgency}
        />} label="Urgency" />
      </FormControl>
      <FormControl>
        <FormControlLabel control={<Checkbox
          id="importance"
          onChange={(e) => setFormData('importance', e.target.checked)}
          checked={formData.importance}
        />} label="Importance" />
      </FormControl>
      <FormControl>
        <DatePicker
          label="Start date"
          disablePast={true}
          slotProps={{
            textField: {
              error: errors.startDate,
              helperText: errors.startDate ? 'Start date should be before end' : '',
            },
          }}
          onChange={(newValue) =>
            setFormData('startDate', newValue?.toDate() ?? new Date())}
          value={dayjs(formData.startDate)} />
      </FormControl>
      <FormControl>
        <DatePicker
          label="End date"
          disablePast={true}
          slotProps={{
            textField: {
              error: errors.endDate,
              helperText: errors.endDate ? 'End date should be later than start' : '',
            },
          }}
          onChange={(newValue) =>
            setFormData('endDate', newValue?.toDate() ?? new Date())}
          value={dayjs(formData.endDate)} />
      </FormControl>
      <FormControl>
        <InputLabel id="dependencies-label">Dependencies</InputLabel>
        <Select
          labelId="dependencies-label"
          id="dependencies"
          multiple
          label="Dependencies"
          value={formData.dependencies as unknown as string}
          onChange={handleDependencyChange}
          input={<OutlinedInput label="Dependencies"/>}
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
            <MenuItem key={task.id} value={task.id}>
              {task.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {members && members.length ? <FormControl>
        <InputLabel id="users-label">Assigned User</InputLabel>
        <Select
          labelId="users-label"
          label="Assigned User"
          id="assigned-users"
          value={formData.user?.username ?? ``}
          onChange={handleUserChange}
          input={<OutlinedInput label="Assigned User"/>}
          MenuProps={{
            PaperProps: {
              style: selectStyle,
            },
          }}
        >
          <MenuItem disabled value="">
            Assigned User
          </MenuItem>
          {members.map((user) => (
            <MenuItem key={user.id} value={user.username}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl> : <></>}
      <Box sx={styles.buttonContainer}>
        <Button variant="contained" color="primary" type="submit">
          Create
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default observer(EditTaskForm);
