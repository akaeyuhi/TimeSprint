import React, { useState } from 'react';
import { Box, Button, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material';
import { CreateProjectDto } from 'src/services/dto/project/create-project.dto';
import { DatePicker } from '@mui/x-date-pickers';
import { styles } from 'src/components/modalForm/styles';
import dayjs from 'dayjs';

interface CreateProjectFormProps {
  onSubmit: (data: CreateProjectDto) => void;
  onClose: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<CreateProjectDto>({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" mb={1}>
        Create New Project
      </Typography>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="name">Project Name</InputLabel>
        <Input
          id="name"
          type="text"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          value={formData.name} />
      </FormControl>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="description">Project description</InputLabel>
        <Input
          id="description"
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
          value={formData.description} />
      </FormControl>
      <FormControl sx={styles.form}>
        <DatePicker
          label="Start date"
          onChange={(newValue) =>
            setFormData({ ...formData, startDate: newValue?.toDate() ?? new Date() })}
          value={dayjs(formData.startDate)} />
      </FormControl>
      <FormControl sx={styles.form}>
        <DatePicker
          label="End date"
          onChange={(newValue) =>
            setFormData({ ...formData, endDate: newValue?.toDate() ?? new Date() })}
          value={dayjs(formData.endDate)} />
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
