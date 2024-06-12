import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styles } from 'src/pages/Home/styles';
import TaskList from 'src/pages/Home/components/TaskList';
import { useStores } from 'src/hooks';
import Loader from 'src/components/loader';


const HomePage: React.FC = () => {
  const currentDate = new Date();
  const { authStore, userStore, handler } = useStores();
  const { username } = authStore.auth.user;
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    userStore.fetch(authStore.auth.user.id);
  }, [authStore.auth.user.id, userStore]);

  if (userStore.isLoading) return <Loader />;
  if (userStore.error) handler.handle(userStore.error.message);

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Box>
        <Typography variant="h4" sx={styles.greeting}>
          Hello, {username}!
        </Typography>
        <Typography variant="h6" sx={styles.date}>
          Today is {formattedDate}.
        </Typography>
        <Box>
          <TaskList tasks={userStore.current.tasks} />
        </Box>
        {/*<Box>*/}
        {/*  <LeisureActivityList leisureActivities={leisureActivities}/>*/}
        {/*</Box>*/}
      </Box>
    </Container>
  );
};

export default HomePage;
