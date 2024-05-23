import React from 'react';
import DeleteModal from 'src/components/deleteModal';
import { Typography } from '@mui/material';
import { Project } from 'src/models/project.model';

interface DeleteProjectModalProps {
  project: Project | null;
  onDelete: (id: number) => Promise<void>;
  onClose: () => void;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({ project, onDelete, onClose }) => (
  <DeleteModal<Project>
    item={project}
    onDelete={onDelete}
    onClose={onClose}
  >
    <Typography variant="body1">
      Are you sure you want to delete this project?
      This action is irreversible.
    </Typography>
  </DeleteModal>
);

export default DeleteProjectModal;
