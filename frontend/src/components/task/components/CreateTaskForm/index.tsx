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
import { CreateTaskDto } from 'src/dto/task/create-task.dto';

interface CreateTaskFormProps {
  onSubmit: (newTask: CreateTaskDto) => void;
  onCancel: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSubmit, onCancel }) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState(false);
  const [importance, setImportance] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      urgency,
      importance,
      startDate: startDate.toDate(),
      endDate: endDate?.toDate(),
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
          onChange={(e) => setName(e.target.value)}
          required
          value={name}
        />
      </FormControl>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="description">Task description</InputLabel>
        <Input
          id="description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          required
          value={description}
        />
      </FormControl>
      <FormControl sx={styles.form}>
        <FormControlLabel
          control={<Checkbox
            id="urgency"
            onChange={(e) => setUrgency(e.target.checked)}
            checked={urgency}
          />}
          label="Urgency"
        />
      </FormControl>
      <FormControl sx={styles.form}>
        <FormControlLabel
          control={<Checkbox
            id="importance"
            onChange={(e) => setImportance(e.target.checked)}
            checked={importance}
          />}
          label="Importance"
        />
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
            Create
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ ml: 2 }}>
            Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default CreateTaskForm;
