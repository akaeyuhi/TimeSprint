import React from 'react';
import {
  Box,
  Button,
  FormControl, FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { CreateProjectDto } from 'src/services/dto/create-project.dto';
import { DatePicker } from '@mui/x-date-pickers';
import { styles } from 'src/components/modalForm/styles';
import dayjs from 'dayjs';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';

interface CreateProjectFormProps {
  onSubmit: (data: CreateProjectDto) => void;
  onClose: () => void;
}


const validate = (state: CreateProjectDto): ValidationErrors<CreateProjectDto> => ({
  name: !(state.name.length > 8),
  description: !(state.description.length > 20),
  startDate: !(state.startDate < state.endDate),
  endDate: !(state.startDate < state.endDate),
});

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData, errors] = useValidation<CreateProjectDto>({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 1),
  }, validate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.name && !errors.description && !errors.startDate && !errors.endDate)
      onSubmit({
        ...formData,
      });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" mb={2}>
        Create New Project
      </Typography>
      <FormControl error={errors.name}>
        <InputLabel htmlFor="name">Project name</InputLabel>
        <OutlinedInput
          id="name"
          type="text"
          onChange={(e) => setFormData('name', e.target.value)}
          required
          aria-describedby="name-error"
          label="Project name"
          value={formData.name} />
        {errors.name && <FormHelperText error id="name-error">
          Name should be 8 characters long
        </ FormHelperText>}
      </FormControl>
      <FormControl error={errors.description}>
        <InputLabel htmlFor="description">Project description</InputLabel>
        <OutlinedInput
          id="description"
          type="text"
          onChange={(e) =>
            setFormData('description', e.target.value)}
          rows={4}
          required
          aria-describedby="desc-error"
          label="Project description"
          value={formData.description} />
        {errors.description && <FormHelperText error id="desc-error">
          Description should be 20 characters long
        </ FormHelperText>}
      </FormControl>
      <FormControl error={errors.startDate}>
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
      <FormControl error={errors.endDate}>
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
