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
import { CreateTeamDto } from 'src/services/dto/team/create-team.dto';
import { styles } from 'src/components/modalForm/styles';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';

interface CreateTeamFormProps {
  onSubmit: (teamDto: CreateTeamDto) => Promise<void>;
  onCancel: () => void;
}

interface FormData {
  name: string,
  description: string,
}

const validate = (state: FormData): ValidationErrors<FormData> => ({
  name: !(state.name.length > 8),
  description: !(state.description.length > 20),
});

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onSubmit, onCancel }) => {
  const [data, setData, errors] = useValidation<FormData>({
    name: '',
    description: '',
  }, validate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.name && !errors.description) {
      await onSubmit(data);
      setData('name', '');
      setData('description', '');
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" gutterBottom>
        Create New Team
      </Typography>
      <FormControl error={errors.name}>
        <InputLabel htmlFor="name">Team Name</InputLabel>
        <OutlinedInput
          id="name"
          type="text"
          onChange={(e) => setData('name', e.target.value)}
          required
          aria-describedby="name-error"
          value={data.name} />
        {errors.name && <FormHelperText error id="name-error">
          Name should be at least 8 characters
        </ FormHelperText>}
      </FormControl>
      <FormControl error={errors.description}>
        <InputLabel htmlFor="description">Team description</InputLabel>
        <OutlinedInput
          id="description"
          type="text"
          aria-describedby="desc-error"
          onChange={(e) => setData('description', e.target.value)}
          required
          value={data.description} />
        {errors.description && <FormHelperText error id="desc-error">
          Description should be at least 20 characters
        </ FormHelperText>}
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

export default CreateTeamForm;
