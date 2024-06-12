import React from 'react';
import { Box, Typography } from '@mui/material';
import LinearProgressWithLabel from 'src/components/progressWithLabel';
import { observer } from 'mobx-react';

interface ProjectProgressBarProps {
  progress: number;
}

const ProjectProgressBar: React.FC<ProjectProgressBarProps> = ({
  progress,
}) => (
  <Box mt={1}>
    <Typography variant="h6">Completion:</Typography>
    <LinearProgressWithLabel value={progress} />
  </Box>
);

export default observer(ProjectProgressBar);
