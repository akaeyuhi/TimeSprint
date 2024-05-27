import React, { useState } from 'react';
import { useModals } from 'src/hooks/use-modals';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import TaskList from 'src/components/task/components/TaskList';

interface TaskSectionProps {
  isProjectPage: boolean,
  isEditable?: boolean,
  isAdmin?: boolean,
}

interface TaskModals {
  createTask: boolean,
  editTask: boolean,
  deleteTask: boolean,
}

const TaskSection: React.FC<TaskSectionProps> = ({
  isProjectPage,
  isEditable = false,
  isAdmin = false,
}) => {
  const [taskModals, setTaskModals] = useState<TaskModals>({
    createTask: false,
    editTask: false,
    deleteTask: false,
  });

  const isProjectAdmin = isProjectPage && isAdmin;

  const modalHandlers = useModals<TaskModals>(taskModals, setTaskModals);

  return (
    <Stack mt={2}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      {(isEditable || isProjectAdmin) && <Box sx={styles.controlsBox}>
        <Button variant="contained" color="primary" onClick={modalHandlers.createTask.open}>
          Create new task
        </Button>
      </Box>}
      <Stack>
        <TaskList
          isProjectPage={isProjectPage}
          isEditable={isEditable}
          isAdmin={isAdmin}
          {...modalHandlers}
        />
      </Stack>
    </Stack>
  );
};

export default TaskSection;
