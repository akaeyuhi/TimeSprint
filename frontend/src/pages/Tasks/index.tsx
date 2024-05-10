import React, { useEffect } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import TaskSection from 'src/components/task/components/TaskSection';
import { observer } from 'mobx-react';
import Loader from 'src/components/loader';


const TaskPage = () => {
  const { userStore } = useStores();

  useEffect(() => {
    userStore.fetch(1);
  }, []);

  if (userStore.isLoading) return <Loader />;

  return (
    <Container>
      <Stack>
        <Box>
          <Typography variant="h4">Your tasks:</Typography>
        </Box>
      </Stack>
      <TaskSection
        tasksArray={userStore.currentUser.tasks}
      />
    </Container>
  );
};

export default observer(TaskPage);
