import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { styles } from 'src/components/modalForm/styles';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Project } from 'src/models/project.model';
import { UpdateProjectDto } from 'src/services/dto/update-project.dto';
import { observer } from 'mobx-react';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';

interface EditProjectFormProps {
  project: Project;
  onSubmit: (updateProjectDto: UpdateProjectDto) => void;
  onClose: () => void;
}

const validate = (
  state: UpdateProjectDto
): ValidationErrors<UpdateProjectDto> => ({
  name: !(state.name && state.name.length > 8),
  description: !(state.description && state.description.length > 20),
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
});

const EditProjectForm: React.FC<EditProjectFormProps> = ({
  project,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData, errors] = useValidation<UpdateProjectDto>(
    {
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
    },
    validate
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      !!(formData.startDate && formData.endDate) &&
        (formData.startDate as Date) < (formData.endDate as Date),
      errors
    );
    if (
      !errors.name &&
      !errors.description &&
      !errors.startDate &&
      !errors.endDate
    )
      onSubmit({
        ...formData,
      });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" mb={2}>
        Edit Project
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
          value={formData.name}
        />
        {errors.name && (
          <FormHelperText error id="name-error">
            Name should be 8 characters long
          </FormHelperText>
        )}
      </FormControl>
      <FormControl error={errors.description}>
        <InputLabel htmlFor="description">Project description</InputLabel>
        <OutlinedInput
          id="description"
          type="text"
          onChange={(e) => setFormData('description', e.target.value)}
          rows={4}
          required
          aria-describedby="desc-error"
          label="Project description"
          value={formData.description}
        />
        {errors.description && (
          <FormHelperText error id="desc-error">
            Description should be 20 characters long
          </FormHelperText>
        )}
      </FormControl>
      <FormControl error={errors.startDate}>
        <DatePicker
          label="Start date"
          disablePast={true}
          slotProps={{
            textField: {
              error: errors.startDate,
              helperText: errors.startDate
                ? 'Start date should be before end'
                : '',
            },
          }}
          onChange={(newValue) =>
            setFormData('startDate', newValue?.toDate() ?? new Date())
          }
          value={dayjs(formData.startDate)}
        />
      </FormControl>
      <FormControl error={errors.endDate}>
        <DatePicker
          label="End date"
          disablePast={true}
          slotProps={{
            textField: {
              error: errors.endDate,
              helperText: errors.endDate
                ? 'End date should be later than start'
                : '',
            },
          }}
          onChange={(newValue) =>
            setFormData('endDate', newValue?.toDate() ?? new Date())
          }
          value={dayjs(formData.endDate)}
        />
      </FormControl>
      <Box sx={styles.buttonContainer}>
        <Button type="submit" variant="contained" color="primary">
          Edit Project
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{ ml: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default observer(EditProjectForm);
