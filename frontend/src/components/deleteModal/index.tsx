import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/components/modalForm/styles';
import { observer } from 'mobx-react';
import { Item } from 'src/models/item.model';

interface DeleteModalProps<T extends Item> {
  item: T | null;
  onDelete: (id: number) => Promise<void>;
  onClose: () => void;
  children: React.ReactNode;
}

const DeleteModal = <T extends Item>({
  item,
  onDelete,
  onClose,
  children,
}: DeleteModalProps<T>) => {
  const handleDelete = async () => {
    if (!item) return;
    await onDelete(item.id);
    onClose();
  };

  return (
    <Stack component="form" sx={styles.container}>
      <Typography variant="h6" mb={1}>
        Confirm Deletion
      </Typography>
      <Box>{children}</Box>
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

export default observer(DeleteModal);
