import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { TaskDto } from 'src/services/dto/task.dto';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { observer } from 'mobx-react';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';
import DependencySelector from 'src/components/task/DependencySelector';
import DeadlineForm from 'src/components/deadlineForm';

interface CreateTaskFormProps {
  onSubmit: (newTask: TaskDto, id?: number) => void;
  onCancel: () => void;
  isEdited?: boolean;
  tasks: Task[];
  task: Task | null;
  members?: User[];
}

const validate = (state: TaskDto): ValidationErrors<TaskDto> => ({
  name: !(state.name && state.name.length > 8),
  description: !(state.description && state.description.length > 20),
  urgency: true,
  importance: true,
  startDate: !(
    state.endDate &&
    state.startDate &&
    state.startDate < state.endDate
  ),
  endDate: !(
    state.endDate &&
    state.startDate &&
    state.startDate < state.endDate
  ),
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
  const [formData, setFormData, validation] = useValidation<TaskDto>(
    {
      name: task?.name ?? '',
      description: task?.description ?? '',
      urgency: task?.urgency ?? false,
      importance: task?.importance ?? false,
      startDate: task?.startDate ?? new Date(),
      endDate: task?.endDate ?? new Date(Date.now() + 1),
      dependencies: task?.dependencies ?? [],
      user: task?.user,
    },
    validate
  );

  const isEditable = isEdited && !!task;
  const tasksToAdd = task ? tasks.filter((item) => item.id !== task.id) : tasks;

  const handleDependencyChange = async (event: SelectChangeEvent<Task[]>) => {
    const { target: value } = event;
    const dependencies = [...(value.value as Task[])];
    setFormData('dependencies', dependencies);
  };

  const handleUserChange = async (event: SelectChangeEvent) => {
    if (!members) return;
    const user = members.find(
      (member) => member.username === event.target.value
    );
    if (user) setFormData('user', user);
  };

  return (
    <DeadlineForm<TaskDto, Task>
      formData={formData}
      item={task}
      onCancel={onCancel}
      onSubmit={onSubmit}
      setFormData={setFormData}
      validation={validation}
      isEdited={isEditable}
    >
      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              id="urgency"
              onChange={(e) => setFormData('urgency', e.target.checked)}
              checked={formData.urgency}
            />
          }
          label="Urgency"
        />
      </FormControl>
      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              id="importance"
              onChange={(e) => setFormData('importance', e.target.checked)}
              checked={formData.importance}
            />
          }
          label="Importance"
        />
      </FormControl>
      <FormControl>
        <InputLabel id="dependencies-label">Dependencies</InputLabel>
        <DependencySelector
          tasks={tasksToAdd}
          formData={formData}
          handleChange={handleDependencyChange}
          handleDependencyDelete={(task: Task) =>
            setFormData(
              'dependencies',
              formData.dependencies.filter((item) => item.id !== task.id)
            )
          }
        />
      </FormControl>
      {members && members.length ? (
        <FormControl>
          <InputLabel id="users-label">Assigned User</InputLabel>
          <Select
            labelId="users-label"
            label="Assigned User"
            id="assigned-users"
            value={formData.user?.username ?? ``}
            onChange={handleUserChange}
            input={<OutlinedInput label="Assigned User" />}
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
        </FormControl>
      ) : (
        <></>
      )}
    </DeadlineForm>
  );
};

export default observer(TaskForm);
