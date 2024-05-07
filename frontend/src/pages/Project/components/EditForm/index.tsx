import React, { useState } from 'react';
import { Box, Button, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material';
import { styles } from 'src/components/modalForm/styles';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Project } from 'src/models/project.model';
import { UpdateProjectDto } from 'src/dto/project/update-project.dto';

interface EditFormProps {
  project: Project,
  onSubmit: (updateProjectDto: UpdateProjectDto) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({
  project,
  onSubmit,
  onCancel
}) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(project.startDate));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(project.endDate));
  const [editedTitle, setEditedTitle] = useState(project.name);
  const [editedDescription, setEditedDescription] = useState(project.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: editedTitle,
      description: editedDescription,
      startDate: startDate.toDate(),
      endDate: endDate?.toDate(),
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" gutterBottom>
          Edit project
      </Typography>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="title">Project title</InputLabel>
        <Input
          id="title"
          type="text"
          onChange={(e) => setEditedTitle(e.target.value)}
          required
          value={editedTitle}/>
      </FormControl>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="description">Team description</InputLabel>
        <Input
          id="description"
          type="text"
          onChange={(e) => setEditedDescription(e.target.value)}
          required
          value={editedDescription}/>
      </FormControl>
      <FormControl sx={styles.form}>
        <DatePicker
          label="Start date"
          onChange={(newValue) => setStartDate(newValue ?? startDate)}
          value={startDate}/>
      </FormControl>
      <FormControl sx={styles.form}>
        <DatePicker
          label="End date"
          onChange={(newValue) => setEndDate(newValue ?? endDate)}
          value={endDate}/>
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

export default EditForm;
