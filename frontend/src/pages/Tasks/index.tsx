import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import TaskSection from 'src/components/task/components/TaskSection';



const TaskPage = () => {
  const { taskStore } = useStores(); // Assuming you have a MobX store for projects
  const tasks = taskStore.tasks;
  return (
    <Container>
      <Stack>
        <Box>
          <Typography variant="h4">Your tasks:</Typography>
        </Box>
      </Stack>
      <TaskSection
        tasksArray={tasks}
      />
    </Container>
  );
};

export default TaskPage;
