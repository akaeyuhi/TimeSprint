import React, { useState } from 'react';
import { useModals } from 'src/hooks/use-modals';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import ModalInfo from 'src/components/modalInfo';
import TaskList from 'src/components/task/components/TaskList';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';

interface TaskSectionProps {
  tasksArray: Task[],
  members?: User[],
}

interface TaskModals {
  tasks: boolean,
  createTask: boolean,
  editTask: boolean,
  deleteTask: boolean,
}

const TaskSection: React.FC<TaskSectionProps> = ({
  tasksArray,
  members
}) => {
  const [taskModals, setTaskModals] = useState({
    tasks: false,
    createTask: false,
    editTask: false,
    deleteTask: false,
  });

  const modalHandlers = useModals<TaskModals>(taskModals, setTaskModals);

  return (
    <Stack mt={2}>
      <Box sx={styles.controlsBox}>
        <Button variant="contained" color="primary" onClick={modalHandlers.createTask.open}>
            Create new task
        </Button>
        {tasksArray.length ? <Button variant="outlined"
          color="primary"
          onClick={modalHandlers.tasks.open}>
            View All Tasks
        </Button> : <></>}
      </Box>
      <Stack>
        <TaskList
          tasks={tasksArray.slice(0, 6)}
          members={members}
          editTask={modalHandlers.editTask}
          createTask={modalHandlers.createTask}
          deleteTask={modalHandlers.deleteTask}
        />
      </Stack>
      <ModalInfo
        open={modalHandlers.tasks.isOpen}
        handleClose={modalHandlers.tasks.close}
        title="All tasks">
        <TaskList
          tasks={tasksArray}
          members={members}
          editTask={modalHandlers.editTask}
          createTask={modalHandlers.createTask}
          deleteTask={modalHandlers.deleteTask}
        />
      </ModalInfo>
    </Stack>
  );
};

export default TaskSection;
