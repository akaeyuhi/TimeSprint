import React, { useState } from 'react';
import { useModals } from 'src/hooks/use-modals';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import ModalInfo from 'src/components/modalInfo';
import TaskList from 'src/components/task/components/TaskList';

interface TaskSectionProps {
  isProjectPage: boolean,
  tasksLength: number,
}

interface TaskModals {
  createTask: boolean,
  editTask: boolean,
  deleteTask: boolean,
  tasks: boolean,
}

const TaskSection: React.FC<TaskSectionProps> = ({
  isProjectPage,
  tasksLength,
}) => {
  const [taskModals, setTaskModals] = useState<TaskModals>({
    createTask: false,
    editTask: false,
    deleteTask: false,
    tasks: false,
  });

  const modalHandlers = useModals<TaskModals>(taskModals, setTaskModals);

  return (
    <Stack mt={2}>
      <Typography variant="h5" gutterBottom>
        Tasks
      </Typography>
      <Box sx={styles.controlsBox}>
        <Button variant="contained" color="primary" onClick={modalHandlers.createTask.open}>
          Create new task
        </Button>
        {tasksLength > 3 ? <Button variant="outlined"
          color="primary"
          onClick={modalHandlers.tasks.open}>
          View All Tasks
        </Button> : <></>}
      </Box>
      <Stack>
        <TaskList
          isProjectPage={isProjectPage}
          taskCount={3}
          {...modalHandlers}
        />
      </Stack>
      <ModalInfo
        open={modalHandlers.tasks.isOpen}
        handleClose={modalHandlers.tasks.close}
        title="All tasks">
        <TaskList
          isProjectPage={isProjectPage}
          {...modalHandlers}
        />
      </ModalInfo>
    </Stack>
  );
};

export default TaskSection;
