import React, { useEffect, useState } from 'react';
import { Task } from 'src/models/task.model';
import { Box, Typography } from '@mui/material';
import LinearProgressWithLabel from 'src/components/progressWithLabel';
import { observer } from 'mobx-react';

interface ProjectProgressBarProps {
  tasks: Task[];
}

const ProjectProgressBar: React.FC<ProjectProgressBarProps> = ({ tasks }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalTasks = tasks.length;
    if (totalTasks === 0) return; // Avoid division by zero
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    setProgress((completedTasks / totalTasks) * 100);
  }, [tasks]);

  return (
    <Box mt={1}>
      <Typography variant="h6">Completion:</Typography>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};

export default observer(ProjectProgressBar);
