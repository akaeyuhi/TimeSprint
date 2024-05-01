import React from 'react';
import { Modal, Box } from '@mui/material';
import { styles } from 'src/components/modalForm/styles';

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalForm: React.FC<ModalFormProps> = ({ open, onClose, children }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={styles.box}
    >
      {children}
    </Box>
  </Modal>
);

export default ModalForm;
