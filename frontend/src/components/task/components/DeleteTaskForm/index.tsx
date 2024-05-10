import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/components/modalForm/styles';
import { Task } from 'src/models/task.model';

interface DeleteTaskFormProps {
  task: Task | null;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteTaskForm: React.FC<DeleteTaskFormProps> = ({ task, onDelete, onClose }) => {
  const handleDelete = () => {
    if (!task) return;
    onDelete();
    onClose();
  };

  return (
    <Stack component="form" sx={styles.container}>
      <Typography variant="h6" mb={1}>Confirm Project Deletion</Typography>
      <Box>
        <Typography variant="body1">
          Are you sure you want to delete this task?
          This action is irreversible.
        </Typography>
      </Box>
      <Box sx={styles.buttonContainer}>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default DeleteTaskForm;
