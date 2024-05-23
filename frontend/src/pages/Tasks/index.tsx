import React, { useEffect } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import TaskSection from 'src/components/task/components/TaskSection';
import { observer } from 'mobx-react';
import Loader from 'src/components/loader';


const TaskPage = () => (
  <Container>
    <TaskSection isProjectPage={false} isEditable />
  </Container>
);

export default observer(TaskPage);
