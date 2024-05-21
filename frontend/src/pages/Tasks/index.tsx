import React, { useEffect } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import TaskSection from 'src/components/task/components/TaskSection';
import { observer } from 'mobx-react';
import Loader from 'src/components/loader';


const TaskPage = () => {
  const { userStore: store } = useStores();

  useEffect(() => {
    store.fetch(1);
  }, []);

  if (store.isLoading) return <Loader />;

  return (
    <Container>
      <Stack>
        <Box>
          <Typography variant="h4">Your tasks:</Typography>
        </Box>
      </Stack>
      <TaskSection isProjectPage={false} tasksLength={store.tasks.length}/>
    </Container>
  );
};

export default observer(TaskPage);
