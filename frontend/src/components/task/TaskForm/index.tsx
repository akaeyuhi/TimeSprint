import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  FormHelperText,
} from '@mui/material';
import { styles } from 'src/components/modalForm/styles';
import { TaskDto } from 'src/services/dto/task.dto';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { observer } from 'mobx-react';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';
import DependencySelector from 'src/components/task/DependencySelector';
import CustomDatePicker from 'src/components/customDatePicker';

interface CreateTaskFormProps {
  onSubmit: (newTask: TaskDto, id?: number) => void;
  onCancel: () => void;
  isEdited?: boolean
  tasks: Task[],
  task: Task | null,
  members?: User[],
}

const validate = (state: TaskDto): ValidationErrors<TaskDto> => ({
  name: !(state.name && state.name.length > 8),
  description: !(state.description && state.description.length > 20),
  urgency: true,
  importance: true,
  startDate: !(state.endDate && state.startDate && state.startDate < state.endDate),
  endDate: !(state.endDate && state.startDate && state.startDate < state.endDate),
  dependencies: !!state.dependencies,
});

const selectStyle = {
  maxHeight: 224,
  width: 250,
};

const TaskForm: React.FC<CreateTaskFormProps> = ({
  tasks,
  task,
  members,
  onSubmit,
  onCancel,
  isEdited = false,
}) => {
  const [formData, setFormData, errors] = useValidation<TaskDto>({
    name: task?.name ?? '',
    description: task?.description ?? '',
    urgency: task?.urgency ?? false,
    importance: task?.importance ?? false,
    startDate: task?.startDate ?? new Date(),
    endDate: task?.endDate ?? new Date(),
    dependencies: task?.dependencies ?? [],
    user: task?.user,
  }, validate);

  const isValid = !(errors.name && errors.description && errors.endDate && errors.startDate);
  const isEditable = isEdited && !!task;
  const tasksToAdd = task ? tasks.filter(item => item.id !== task.id) : tasks;

  const handleDependencyChange = async (event: SelectChangeEvent<Task[]>) => {
    const { target: value } = event;
    const dependencies = [...value.value as Task[]];
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
      onSubmit({
        ...formData,
      }, task?.id);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" gutterBottom mb={2}>
        {isEditable ? 'Edit' : 'Create'} Task
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
        <CustomDatePicker
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          type="startDate"/>
      </FormControl>
      <FormControl>
        <CustomDatePicker
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          type="endDate"/>
      </FormControl>
      <FormControl>
        <InputLabel id="dependencies-label">Dependencies</InputLabel>
        <DependencySelector
          tasks={tasksToAdd}
          formData={formData}
          handleChange={handleDependencyChange}
          handleDependencyDelete={(task: Task) =>
            setFormData('dependencies', formData.dependencies.filter((item) =>
              item.id !== task.id))
          }
        />
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
          {isEditable ? 'Edit' : 'Create'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default observer(TaskForm);
