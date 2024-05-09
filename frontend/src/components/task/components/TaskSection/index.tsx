import React from 'react';
import { ModalHandler } from 'src/hooks/use-modals';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import ModalInfo from 'src/components/modalInfo';
import TaskList from 'src/components/task/components/TaskList';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';

interface TaskSectionProps {
  createTask: ModalHandler,
  editTask: ModalHandler,
  deleteTask: ModalHandler,
  tasks: ModalHandler,
  tasksArray: Task[],
  members?: User[],
}

const TaskSection: React.FC<TaskSectionProps> = ({
  tasksArray,
  createTask,
  editTask,
  deleteTask,
  tasks,
  members
}) => (
  <Stack mt={2}>
    <Box sx={styles.controlsBox}>
      <Button variant="contained" color="primary" onClick={createTask.open}>
            Create new task
      </Button>
      {tasksArray.length ? <Button variant="outlined"
        color="primary"
        onClick={tasks.open}>
            View All Tasks
      </Button> : <></>}
    </Box>
    <Stack>
      <TaskList
        tasks={tasksArray.slice(0, 6)}
        editTask={editTask}
        members={members}
        createTask={createTask}
        deleteTask={deleteTask}
      />
    </Stack>
    <ModalInfo
      open={tasks.isOpen}
      handleClose={tasks.close}
      title="All tasks">
      <TaskList
        tasks={tasksArray}
        members={members}
        editTask={editTask}
        createTask={createTask}
        deleteTask={deleteTask}
      />
    </ModalInfo>
  </Stack>
);

export default TaskSection;
