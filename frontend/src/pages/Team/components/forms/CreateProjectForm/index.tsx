import React, { useState } from 'react';
import { Box, Button, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material';
import { CreateProjectDto } from 'src/dto/project/create-project.dto';
import { DatePicker } from '@mui/x-date-pickers';
import { styles } from 'src/components/modalForm/styles';
import dayjs, { Dayjs } from 'dayjs';

interface CreateProjectFormProps {
  onSubmit: (data: CreateProjectDto) => void;
  onClose: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      startDate: startDate?.toDate() ?? new Date(),
      endDate: endDate?.toDate() ?? new Date(),
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" mb={1}>
          Create New Project
      </Typography>
      <FormControl>
        <InputLabel htmlFor="name">Project Name</InputLabel>
        <Input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
          value={name}/>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="description">Project description</InputLabel>
        <Input
          id="description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          value={description}/>
      </FormControl>
      <FormControl>
        <DatePicker
          label="Start date"
          onChange={(newValue) => setStartDate(newValue ?? dayjs())}
          value={startDate}/>
      </FormControl>
      <FormControl>
        <DatePicker
          label="End date"
          onChange={(newValue) => setEndDate(newValue ?? dayjs())}
          value={endDate}/>
      </FormControl>
      <Box sx={styles.buttonContainer}>
        <Button type="submit" variant="contained" color="primary">
            Create Project
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
            Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default CreateProjectForm;
