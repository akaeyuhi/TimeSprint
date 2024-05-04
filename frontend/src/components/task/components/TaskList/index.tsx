import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import TaskItem from '../TaskItem';
import { Task } from 'src/models/task.model';
import { ModalHandler } from 'src/hooks/use-modals';

interface TaskListProps {
  tasks: Task[];
  editTaskModalOpen: boolean,
  editTask: ModalHandler,
  onToggle: () => void,
  onSubmit: () => void,
}

const TaskList: React.FC<TaskListProps> = ({ tasks,
  editTaskModalOpen,
  editTask,
  onToggle, onSubmit }) => (
  <Box>
    <Typography variant="h5" gutterBottom>
        Tasks
    </Typography>
    {tasks.length === 0 ? (
      <Typography variant="body1">No tasks available</Typography>
    ) : (
      <List sx={{ display: 'flex' }}>
        {tasks.map(task => (
          <ListItem key={task.id}>
            <TaskItem
              task={task}
              editTask={editTask}
              editTaskModalOpen={editTaskModalOpen}
              onToggle={onToggle}
              onSubmit={onSubmit}
            />
          </ListItem>
        ))}
      </List>
    )}
  </Box>
);

export default TaskList;
