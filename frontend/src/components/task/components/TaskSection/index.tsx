import React, { useState } from 'react';
import { useModals } from 'src/hooks/use-modals';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import TaskList from 'src/components/task/components/TaskList';

interface TaskSectionProps {
  isProjectPage: boolean,
  isEditable: boolean,
}

interface TaskModals {
  createTask: boolean,
  editTask: boolean,
  deleteTask: boolean,
}

const TaskSection: React.FC<TaskSectionProps> = ({
  isProjectPage,
  isEditable = true,
}) => {
  const [taskModals, setTaskModals] = useState<TaskModals>({
    createTask: false,
    editTask: false,
    deleteTask: false,
  });

  const modalHandlers = useModals<TaskModals>(taskModals, setTaskModals);

  return (
    <Stack mt={2}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      {isEditable && <Box sx={styles.controlsBox}>
        <Button variant="contained" color="primary" onClick={modalHandlers.createTask.open}>
          Create new task
        </Button>
      </Box>}
      <Stack>
        <TaskList
          isProjectPage={isProjectPage}
          isEditable={isEditable}
          {...modalHandlers}
        />
      </Stack>
    </Stack>
  );
};

export default TaskSection;
