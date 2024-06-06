import React from 'react';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import { styles } from 'src/components/modalInfo/styles';

interface ModalInfoProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  title: string;
}

const ModalInfo: React.FC<ModalInfoProps> = ({ open, handleClose, title, children }) => (
  <Modal open={open}
         onClose={handleClose}
         closeAfterTransition
         slots={{ backdrop: Backdrop }}
         slotProps={{
           backdrop: {
             timeout: 500,
           },
         }}>
    <Fade in={open}>
      <Box sx={styles.box}>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        {children}
      </Box>
    </Fade>
  </Modal>
);

export default ModalInfo;
