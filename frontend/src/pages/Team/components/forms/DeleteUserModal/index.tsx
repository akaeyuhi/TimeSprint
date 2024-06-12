import React from 'react';
import DeleteModal from 'src/components/deleteModal';
import { Typography } from '@mui/material';
import { User } from 'src/models/user.model';
import { Item } from 'src/models/item.model';

interface DeleteUserModalProps {
  user: User | null;
  isAdmin: boolean;
  onDelete: (id: number) => Promise<void>;
  onClose: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  user,
  onDelete,
  onClose,
  isAdmin = false,
}) => (
  <DeleteModal<Item>
    item={{ id: user?.id, name: user?.username, isAdmin } as unknown as Item}
    onDelete={onDelete}
    onClose={onClose}
  >
    <Typography variant="body1">
      Are you sure you want to delete this {isAdmin ? 'admin' : 'user'}?
      This action is irreversible.
    </Typography>
  </DeleteModal>
);

export default DeleteUserModal;
