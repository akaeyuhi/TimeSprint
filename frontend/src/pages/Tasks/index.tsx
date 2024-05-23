import React from 'react';
import { Container } from '@mui/material';
import TaskSection from 'src/components/task/components/TaskSection';
import { observer } from 'mobx-react';


const TaskPage = () => (
  <Container>
    <TaskSection isProjectPage={false} isEditable />
  </Container>
);

export default observer(TaskPage);
