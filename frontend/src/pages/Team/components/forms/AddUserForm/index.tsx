import React, { useState } from 'react';
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Stack, Typography } from '@mui/material';
import { styles } from 'src/components/modalForm/styles';

interface AddUserFormProps {
  onSubmit: (username: string) => void;
  onClose: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onSubmit, onClose }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate username format
    const isValidUsername = /^[\w\d]+$/.test(username) && true; // future server validation
    if (isValidUsername) {
      onSubmit(username);
      setUsername('');
      setError('');
    } else {
      setError('Invalid username format');
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" mb={1}>
          Add new member
      </Typography>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="name">Username</InputLabel>
        <Input
          id="name"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
          value={username}/>
        <FormHelperText error={true}>{error}</FormHelperText>
      </FormControl>
      <Box sx={styles.buttonContainer}>
        <Button type="submit" variant="contained" color="primary">
            Add user
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
            Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default AddUserForm;
