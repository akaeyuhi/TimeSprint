import React, { useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import { useModals } from 'src/hooks/use-modals';
import TaskSection from 'src/components/task/components/TaskSection';

interface TasksModals {
  edit: boolean,
  tasks: boolean,
  createTask: boolean,
  editTask: boolean,
  deleteTask: boolean,
}


const TaskPage = () => {
  const { taskStore } = useStores(); // Assuming you have a MobX store for projects
  const [taskModals, setTaskModals] = useState<TasksModals>({
    edit: false,
    tasks: false,
    createTask: false,
    editTask: false,
    deleteTask: false,
  });
  const modalHandlers = useModals<TasksModals>(taskModals, setTaskModals);
  const tasks = taskStore.tasks;
  return (
    <Container>
      <Stack>
        <Box>
          <Typography variant="h4">Your tasks:</Typography>
        </Box>
      </Stack>
      <TaskSection
        createTask={modalHandlers.createTask}
        deleteTask={modalHandlers.deleteTask}
        editTask={modalHandlers.editTask}
        tasks={modalHandlers.tasks}
        tasksArray={tasks}
      />
    </Container>
  );
};

export default TaskPage;
