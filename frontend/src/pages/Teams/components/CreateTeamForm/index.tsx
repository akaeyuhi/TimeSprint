import React, { useState } from 'react';
import { Typography, Button, Box, FormControl, InputLabel, Input, Stack } from '@mui/material';
import { CreateTeamDto } from 'src/pages/Teams/dto/create-team.dto';
import { styles } from './styles';

interface CreateTeamFormProps {
  onSubmit: (teamDto: CreateTeamDto) => void;
  onCancel: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" gutterBottom>
          Create New Team
      </Typography>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="name">Team Name</InputLabel>
        <Input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
          value={name}/>
      </FormControl>
      <FormControl sx={styles.form}>
        <InputLabel htmlFor="description">Team description</InputLabel>
        <Input
          id="description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          required
          value={description}/>
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
