import React, { useEffect, useState } from 'react';
import { useModals } from 'src/hooks/use-modals';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import { observer } from 'mobx-react';
import ActivityList from 'src/pages/Activities/components/ActivityList';
import { isObjectEmpty } from 'src/utils/common/isObjectEmpty';
import { useStores } from 'src/hooks';
import Loader from 'src/components/loader';

interface ActivityModals {
  createActivity: boolean;
  editActivity: boolean;
  deleteActivity: boolean;
}

const ActivityPage = () => {
  const [activityModals, setActivityModals] = useState<ActivityModals>({
    createActivity: false,
    editActivity: false,
    deleteActivity: false,
  });

  const { userStore: store, authStore, handler } = useStores();

  const modalHandlers = useModals<ActivityModals>(
    activityModals,
    setActivityModals
  );

  useEffect(() => {
    if (isObjectEmpty(store.current)) {
      store.fetch(authStore.auth.user.id);
    }
  }, [authStore.auth.user.id, store]);

  if (store.isLoading || isObjectEmpty(store.current)) return <Loader />;
  if (store.error) handler.handle(store.error.message);

  return (
    <Container>
      <Stack mt={2}>
        <Typography variant="h4" gutterBottom>
          Tasks
        </Typography>
        <Box sx={styles.controlsBox}>
          <Button
            variant="contained"
            color="primary"
            onClick={modalHandlers.createActivity.open}
          >
            Create new activity
          </Button>
        </Box>
        <Stack>
          <ActivityList {...modalHandlers} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default observer(ActivityPage);
