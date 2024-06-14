import React from 'react';
import DeleteModal from 'src/components/deleteModal';
import { Typography } from '@mui/material';
import { LeisureActivity } from 'src/models/activity.model';

interface DeleteActivityModalProps {
  activity: LeisureActivity | null;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
}

const DeleteActivityModal: React.FC<DeleteActivityModalProps> = ({
  activity,
  onDelete,
  onClose,
}) => (
  <DeleteModal<LeisureActivity>
    item={activity}
    onDelete={onDelete}
    onClose={onClose}
  >
    <Typography variant="body1">
      Are you sure you want to delete this activity? This action is
      irreversible.
    </Typography>
  </DeleteModal>
);

export default DeleteActivityModal;
