import React from 'react';
import { ModalHandler } from 'src/hooks/use-modals';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import ModalInfo from 'src/components/modalInfo';
import { Project } from 'src/models/project.model';
import TaskList from 'src/components/task/components/TaskList';

interface TaskSectionProps {
  createTask: ModalHandler,
  editTask: ModalHandler,
  tasks: ModalHandler,
  project: Project,
  editModal: boolean,
  createModal: boolean,
  allTasksModal: boolean,
}

const TaskSection: React.FC<TaskSectionProps> = ({
  project,
  createTask,
  editTask,
  tasks,
  editModal,
  createModal,
  allTasksModal
}) => (
  <>
    <Stack mt={2}>
      <Typography variant="h5" gutterBottom>
          Tasks
      </Typography>
      <Box sx={styles.controlsBox}>
        <Button variant="contained" color="primary" onClick={createTask.open}>
            Create new task
        </Button>
        {project.tasks.length ? <Button variant="outlined"
          color="primary"
          onClick={tasks.open}>
            View All Tasks
        </Button> : <></>}
      </Box>
      <Stack>
        <TaskList
          tasks={project.tasks.slice(0, 6)}
          editTask={editTask}
          members={project.team?.members}
          editTaskModalOpen={editModal}
          createTask={createTask} createTaskModalOpen={createModal}/>
      </Stack>
      <ModalInfo
        open={allTasksModal}
        handleClose={tasks.close}
        title="Project tasks">
        <TaskList
          tasks={project.tasks}
          members={project.team?.members}
          editTask={editTask}
          editTaskModalOpen={editModal}
          createTask={createTask} createTaskModalOpen={createModal}/>
      </ModalInfo>
    </Stack>
  </>
);

export default TaskSection;
