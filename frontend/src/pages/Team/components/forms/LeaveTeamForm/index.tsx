import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/components/forms/CreateProjectForm/styles';
import { Team } from 'src/models/team.model';

interface LeaveTeamFormProps {
  team: Team;
  onClose: () => void;
  onLeave: () => void;
}

const LeaveTeamForm: React.FC<LeaveTeamFormProps> = ({ team, onClose, onLeave }) => (
  <Stack component="form" sx={styles.container}>
    <Typography variant="h6" mb={1}>Confirm team leaving</Typography>
    <Typography variant="body1">
        Are you sure you want to leave team &quot;{team?.name}&quot;?
        This action is irreversible.
    </Typography>
    <Box sx={styles.buttonContainer}>
      <Button onClick={onLeave} variant="contained" color="error">
          Leave
      </Button>
      <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
      </Button>
    </Box>
  </Stack>
);

export default LeaveTeamForm;
