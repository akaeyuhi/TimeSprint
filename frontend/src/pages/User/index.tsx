import React, { useEffect, useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import TaskSection from 'src/components/task/TaskSection';
import TeamList from 'src/components/team/TeamList';
import { useStores } from 'src/hooks';
import { observer } from 'mobx-react';
import Loader from 'src/components/loader';
import { useParams } from 'react-router-dom';
import { isObjectEmpty } from 'src/utils/common/isObjectEmpty';
import { User } from 'src/models/user.model';

const UserPage: React.FC = () => {
  const { userStore: store, authStore, handler } = useStores();
  const [user, setUser] = useState({} as User);
  const { id } = useParams();

  const userId = id ? parseInt(id) : authStore.auth.user.id;
  const isOwnPage = userId === authStore.auth?.user?.id;

  useEffect(() => {
    if (isOwnPage && isObjectEmpty(store.current)) {
      store.fetch(userId).then(() => {
        setUser(store.current);
      });
    } else if (isOwnPage) {
      setUser(store.current);
    } else {
      store.getUser(userId).then((user) => {
        if (user) setUser(user);
      });
    }
  }, [isOwnPage, store, userId]);

  if (store.isLoading || isObjectEmpty(user)) return <Loader />;
  if (store.error) handler.handle(store.error.message);

  const getWelcomeText = isOwnPage
    ? `Welcome, ${user && user.username}`
    : `${user && user.username}'s page`;

  return (
    <Container>
      <Typography variant="h4">{getWelcomeText}</Typography>
      <TaskSection isEditable={isOwnPage} isProjectPage={false} />
      <Stack mt={4}>
        <Typography variant="h5">Teams</Typography>
      </Stack>
      <Stack>
        <TeamList teams={user.teams} />
      </Stack>
    </Container>
  );
};

export default observer(UserPage);
