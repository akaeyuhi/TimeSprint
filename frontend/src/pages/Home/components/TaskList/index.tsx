import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import TaskItem from '../TaskItem';
import { Task } from 'src/models/task.model';

interface Props {
  tasks: Task[];
}

const TaskList: React.FC<Props> = ({ tasks }) => (
  <Box>
    <Typography variant="h5" gutterBottom>
        Urgent Tasks
    </Typography>
    <List sx={{ display: 'flex' }}>
      {tasks.map(task => (
        <ListItem key={task.id}>
          <TaskItem task={task}/>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default TaskList;
