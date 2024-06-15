import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styles } from 'src/pages/Home/styles';
import TaskList from 'src/pages/Home/components/TaskList';
import { useStores } from 'src/hooks';
import Loader from 'src/components/loader';
import LeisureActivityList from 'src/pages/Home/components/ActivityList';
import { isObjectEmpty } from 'src/utils/common/isObjectEmpty';
import { observer } from 'mobx-react';

const HomePage: React.FC = () => {
  const currentDate = new Date();
  const { authStore, userStore: store, handler } = useStores();
  const { username, id } = authStore.auth.user;
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    if (isObjectEmpty(store.current)) store.fetch(id);
  }, [id, store]);

  if (store.isLoading || isObjectEmpty(store.current)) return <Loader />;
  if (store.error) handler.handle(store.error.message);

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Box>
        <Typography variant="h4" sx={styles.greeting}>
          Hello, {username}!
        </Typography>
        <Typography variant="h6" sx={styles.date}>
          Today is {formattedDate}.
        </Typography>
        <Box mt={2}>
          <TaskList tasks={store.current.tasks.slice(0, 3)} />
        </Box>
        <Box mt={2}>
          <LeisureActivityList
            leisureActivities={store.current.activities.slice(0, 3)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default observer(HomePage);
