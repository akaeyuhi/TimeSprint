import React, { useEffect } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import TaskSection from 'src/components/task/components/TaskSection';
import TeamList from 'src/components/team/TeamList';
import { useStores } from 'src/hooks';
import { observer } from 'mobx-react';
import Loader from 'src/components/loader';
import { useParams } from 'react-router-dom';

const UserPage: React.FC = () => {
  const { userStore: store, authStore } = useStores();
  const { id } = useParams();

  const userId = id ? parseInt(id) : authStore.auth.user.id;

  useEffect(() => {
    store.fetch(userId);
  }, []);

  if (store.isLoading || !store.current) return <Loader />;
  if (store.error) throw store.error;

  const isOwnPage = userId !== authStore.auth?.user?.id;
  const getWelcomeText = () => (isOwnPage ?
    (`Welcome, ${store.current && store.current?.username}`) :
    (`${store.current && store.current?.username}'s page`));

  return (
    <Container>
      <Typography variant="h4">
        {getWelcomeText()}
      </Typography>
      <TaskSection isEditable={isOwnPage} isProjectPage={false} />
      <Stack mt={4}>
        <Typography variant="h5">Teams</Typography>
      </Stack>
      <Stack>
        <TeamList teams={store.current?.teams} />
      </Stack>
    </Container>
  );
};

export default observer(UserPage);
