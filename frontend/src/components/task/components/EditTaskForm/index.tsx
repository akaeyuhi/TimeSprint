import React, { useState } from 'react';
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Box,
  Stack,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { styles } from 'src/components/modalForm/styles';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Task } from 'src/models/task.model';
import { UpdateTaskDto } from 'src/dto/task/update-task.dto';

interface EditTaskFormProps {
  task: Task,
  onSubmit: (updatedTask: UpdateTaskDto) => void,
  onCancel: () => void
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(task.startDate));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(task.endDate));
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [urgency, setUrgency] = useState(task.urgency);
  const [importance, setImportance] = useState(task.importance);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: editedName,
      description: editedDescription,
      urgency,
      importance,
      startDate: startDate.toDate(),
      endDate: endDate?.toDate(),
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" gutterBottom>
          Edit Task
      </Typography>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="name">Task name</InputLabel>
        <Input
          id="name"
          type="text"
          onChange={(e) => setEditedName(e.target.value)}
          required
          value={editedName}
        />
      </FormControl>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="description">Task description</InputLabel>
        <Input
          id="description"
          type="text"
          onChange={(e) => setEditedDescription(e.target.value)}
          required
          value={editedDescription}
        />
      </FormControl>
      <FormControl sx={styles.form}>
        <FormControlLabel control={<Checkbox
          id="urgency"
          defaultChecked
          onChange={(e) => setUrgency(e.target.checked)}
          checked={urgency}
        />} label="Urgency"/>

      </FormControl>
      <FormControl sx={styles.form}>
        <FormControlLabel control={<Checkbox
          id="importance"
          defaultChecked
          onChange={(e) => setImportance(e.target.checked)}
          checked={importance}
        />} label="Importance"/>
      </FormControl>
      <FormControl sx={styles.form}>
        <DatePicker
          label="Start date"
          onChange={(newValue) => setStartDate(newValue ?? startDate)}
          value={startDate}
        />
      </FormControl>
      <FormControl sx={styles.form}>
        <DatePicker
          label="End date"
          onChange={(newValue) => setEndDate(newValue ?? endDate)}
          value={endDate}
        />
      </FormControl>
      <Box sx={styles.buttonContainer}>
        <Button variant="contained" color="primary" type="submit">
            Edit
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ ml: 2 }}>
            Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default EditTaskForm;
