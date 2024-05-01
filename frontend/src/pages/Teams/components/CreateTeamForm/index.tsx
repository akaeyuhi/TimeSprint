import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { CreateTeamDto } from 'src/pages/Teams/dto/create-team.dto';
import { styles } from './styles';

interface CreateTeamFormProps {
  onSubmit: (teamDto: CreateTeamDto) => void;
  onCancel: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit({ name, description });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
          Create New Team
      </Typography>
      <TextField
        label="Team Name"
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Box sx={styles.buttonContainer}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default CreateTeamForm;
