import React from 'react';
import DeleteModal from 'src/components/deleteModal';
import { Task } from 'src/models/task.model';
import { Typography } from '@mui/material';

interface DeleteTaskModal {
  task: Task | null;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModal> = ({
  task,
  onDelete,
  onClose,
}) => (
  <DeleteModal<Task> item={task} onDelete={onDelete} onClose={onClose}>
    <Typography variant="body1">
      Are you sure you want to delete this task? This action is irreversible.
    </Typography>
  </DeleteModal>
);

export default DeleteTaskModal;
