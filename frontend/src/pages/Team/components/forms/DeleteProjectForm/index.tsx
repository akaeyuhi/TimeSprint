import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Project } from 'src/models/project.model';
import { styles } from 'src/pages/Team/components/forms/CreateProjectForm/styles';

interface DeleteProjectFormProps {
  project: Project | null;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteProjectForm: React.FC<DeleteProjectFormProps> = ({ project, onDelete, onClose }) => {
  const handleDelete = () => {
    if (!project) return;
    onDelete();
    onClose();
  };

  return (
    <Stack component="form" sx={styles.container}>
      <Typography variant="h6" mb={1}>Confirm Project Deletion</Typography>
      <Box>
        <Typography variant="body1">
        Are you sure you want to delete project &quot;{project?.name}&quot;?
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

export default DeleteProjectForm;
