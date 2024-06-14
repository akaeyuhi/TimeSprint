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
  Typography,
} from '@mui/material';
import { User } from 'src/models/user.model';
import { styles } from 'src/components/modalForm/styles';
import { useStore } from 'src/hooks';

interface AddAdminFormProps {
  onSubmit: (member: User) => void;
  onClose: () => void;
}

const AddAdminForm: React.FC<AddAdminFormProps> = ({ onSubmit, onClose }) => {
  const [username, setUsername] = useState<string>('');
  const { members, admins } = useStore('teamStore').current;
  const { id: currentUser } = useStore('authStore').auth.user;
  const adminCandidates = members.filter(
    (user) =>
      user.id !== currentUser && !admins.some((admin) => admin.id !== user.id)
  );
  const [noCandidates, setNoCandidates] = useState(!!adminCandidates.length);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = adminCandidates.find((user) => user.username === username);
    if (user) {
      onSubmit(user);
      setUsername('');
      setNoCandidates(false);
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" mb={2}>
        Add new admin
      </Typography>
      <FormControl error={noCandidates}>
        <InputLabel id="user-select-label">Member</InputLabel>
        <Select
          id="user-select"
          labelId="user-select-label"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Member</em>;
            }
          }}
          label="Member"
        >
          <MenuItem disabled value="">
            Member
          </MenuItem>
          {adminCandidates.map((candidate) => (
            <MenuItem key={candidate.id} value={candidate.username}>
              {candidate.username}
            </MenuItem>
          ))}
        </Select>
        {noCandidates && (
          <FormHelperText error>There are no candidates</FormHelperText>
        )}
      </FormControl>
      <Box sx={styles.buttonContainer}>
        <Button type="submit" variant="contained" color="primary">
          Promote to admin
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

export default AddAdminForm;
