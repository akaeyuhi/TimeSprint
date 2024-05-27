import React, { useState } from 'react';
import { Box, Button, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material';
import { CreateTeamDto } from 'src/services/dto/team/create-team.dto';
import { styles } from 'src/components/modalForm/styles';

interface CreateTeamFormProps {
  onSubmit: (teamDto: CreateTeamDto) => Promise<void>;
  onCancel: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography variant="h6" gutterBottom>
        Create New Team
      </Typography>
      <FormControl>
        <InputLabel htmlFor="name">Team Name</InputLabel>
        <Input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
          value={name} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="description">Team description</InputLabel>
        <Input
          id="description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          required
          value={description} />
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
