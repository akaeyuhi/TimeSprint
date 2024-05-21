import React, { useEffect } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import TaskSection from 'src/components/task/components/TaskSection';
import TeamList from 'src/components/team/TeamList';
import { useStores } from 'src/hooks';
import { observer } from 'mobx-react';
import Loader from 'src/components/loader';

const UserPage: React.FC = () => {
  const { userStore: store } = useStores();

  useEffect(() => {
    store.fetch(1);
  }, []);

  if (store.isLoading) return <Loader />;

  return (
    <Container>
      <Typography variant="h4">
        Welcome, {store.current && store.current.username}
      </Typography>
      <Stack mt={4}>
        <Typography variant="h5">{store.current.username}&apos;s Tasks</Typography>
      </Stack>
      <TaskSection tasksLength={store.tasks.length} isProjectPage={false}/>
      <Stack mt={4}>
        <Typography variant="h5">{store.current.username}&apos;s Teams</Typography>
      </Stack>
      <Stack>
        <TeamList teams={store.current.teams} />
      </Stack>
    </Container>
  );
};

export default observer(UserPage);
