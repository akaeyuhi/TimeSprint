import React, { useEffect } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import TaskSection from 'src/components/task/components/TaskSection';
import TeamList from 'src/components/team/TeamList';
import { useStores } from 'src/hooks';
import { observer } from 'mobx-react';
import Loader from 'src/components/loader';

const UserPage: React.FC = () => {
  const { userStore } = useStores();

  useEffect(() => {
    userStore.fetch(1);
  }, [userStore]);

  if (userStore.isLoading) return <Loader />;

  return (
    <Container>
      <Typography variant="h4">
        Welcome, {userStore.currentUser && userStore.currentUser.username}
      </Typography>
      <Stack mt={4}>
        <Typography variant="h5">{userStore.currentUser.username}&apos;s Tasks</Typography>
      </Stack>
      <TaskSection tasksArray={userStore.currentUser.tasks} />
      <Stack mt={4}>
        <Typography variant="h5">{userStore.currentUser.username}&apos;s Teams</Typography>
      </Stack>
      <Stack>
        <TeamList teams={userStore.currentUser.teams} />
      </Stack>
    </Container>
  );
};

export default observer(UserPage);
