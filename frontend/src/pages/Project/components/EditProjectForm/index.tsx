import React, { useState } from 'react';
import { Box, Button, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material';
import { styles } from 'src/components/modalForm/styles';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Project } from 'src/models/project.model';
import { UpdateProjectDto } from 'src/services/dto/project/update-project.dto';
import { observer } from 'mobx-react';

interface EditProjectFormProps {
  project: Project,
  onSubmit: (updateProjectDto: UpdateProjectDto) => void;
  onCancel: () => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<UpdateProjectDto>({
    name: project.name,
    description: project.description,
    startDate: project.startDate,
    endDate: project.endDate,
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
        Edit Project
      </Typography>
      <FormControl>
        <InputLabel htmlFor="name">Project Name</InputLabel>
        <Input
          id="name"
          type="text"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          value={formData.name} />
      </FormControl>
      <FormControl>
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
      <FormControl>
        <DatePicker
          label="Start date"
          onChange={(newValue) =>
            setFormData({ ...formData, startDate: newValue?.toDate() ?? new Date() })}
          value={dayjs(formData.startDate)} />
      </FormControl>
      <FormControl>
        <DatePicker
          label="End date"
          onChange={(newValue) =>
            setFormData({ ...formData, endDate: newValue?.toDate() ?? new Date() })}
          value={dayjs(formData.endDate)} />
      </FormControl>
      <Box sx={styles.buttonContainer}>
        <Button type="submit" variant="contained" color="primary">
          Edit Project
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default observer(EditProjectForm);
