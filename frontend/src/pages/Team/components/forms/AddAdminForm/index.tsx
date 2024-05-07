import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { User } from 'src/models/user.model';
import { styles } from 'src/components/modalForm/styles';

interface AddAdminFormProps {
  candidates: User[];
  onSubmit: (member: User) => void;
  onClose: () => void;
}

const AddAdminForm: React.FC<AddAdminFormProps> = ({ candidates, onSubmit, onClose }) => {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = candidates.find(user => user.username === username);
    if (user) {
      onSubmit(user);
      setUsername('');
      setError('');
    } else {
      setError('Please select a user');
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" mb={1}>
          Add new admin
      </Typography>
      <FormControl sx={styles.form}>
        <InputLabel id="user-select-label">Member</InputLabel>
        <Select
          id="user-select"
          labelId="user-select-label"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          label="Member"
        >
          {candidates.map((candidate) => (
            <MenuItem key={candidate.id} value={candidate.username}>
              {candidate.username}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={true}>{error}</FormHelperText>
      </FormControl>
      <Box sx={styles.buttonContainer}>
        <Button type="submit" variant="contained" color="primary">
            Promote to admin
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
            Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default AddAdminForm;
