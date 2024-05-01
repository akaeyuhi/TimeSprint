import React from 'react';
import { Modal, Box, Fade, Backdrop } from '@mui/material';
import { styles } from 'src/components/modalForm/styles';

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalForm: React.FC<ModalFormProps> = ({ open, onClose, children }) => (
  <Modal open={open} onClose={onClose} closeAfterTransition slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}>
    <Fade in={open}>
      <Box
        sx={styles.box}
      >
        {children}
      </Box>
    </Fade>
  </Modal>
);

export default ModalForm;
