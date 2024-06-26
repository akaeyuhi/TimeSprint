import React, { useState } from 'react';
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
import { User } from 'src/models/user.model';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';
import { useService } from 'src/hooks';

interface AddUserFormProps {
  onSubmit: (user: User) => Promise<void>;
  onClose: () => void;
}

const validate = (state: {
  username: string;
}): ValidationErrors<{ username: string }> => ({
  username: !(state.username.length > 8),
});

const AddUserForm: React.FC<AddUserFormProps> = ({ onSubmit, onClose }) => {
  const [data, setData, validation] = useValidation({ username: '' }, validate);
  const [userError, setUserError] = useState('');
  const userService = useService('userService');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError('');
    // Validate username format
    if (validation.validate()) {
      const candidate = await userService.getUserByUsername(data.username);
      if (candidate) {
        await onSubmit(candidate);
        setData('username', '');
      } else {
        setUserError(`Such user doesn't exists`);
      }
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" mb={2}>
        Add new member
      </Typography>
      <FormControl error={validation.errors.username || !!userError.length}>
        <InputLabel htmlFor="name">Username</InputLabel>
        <OutlinedInput
          id="name"
          type="text"
          onChange={(e) => setData('username', e.target.value)}
          required
          label="Username"
          aria-describedby="username-error"
          value={data.username}
        />
        {(validation.errors.username || !!userError.length) && (
          <FormHelperText error id="username-error">
            {validation.errors.username
              ? 'Name should be 8 characters long'
              : userError.length
                ? userError
                : ''}
          </FormHelperText>
        )}
      </FormControl>
      <Box sx={styles.buttonContainer}>
        <Button type="submit" variant="contained" color="primary">
          Add user
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

export default AddUserForm;
