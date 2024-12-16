import React from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import TaskItem from '../TaskItem';
import { Task } from 'src/models/task.model';
import { Link } from 'react-router-dom';

interface Props {
  tasks: Task[];
}

const TaskList: React.FC<Props> = ({ tasks }) => (
  <Box mt={2}>
    {tasks && tasks.length ? (
      <>
        <Typography variant="h5" gutterBottom>
          Urgent Tasks:
        </Typography>
        <List sx={{ display: 'flex' }}>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <TaskItem task={task} />
            </ListItem>
          ))}
        </List>
      </>
    ) : (
      <>
        <Typography variant="h5" gutterBottom mb={2}>
          No tasks planned. Maybe you should create one?
        </Typography>
        <Link to="/app/tasks">
          <Button variant="contained" color="primary">
            To task page
          </Button>
        </Link>
      </>
    )}
  </Box>
);

export default TaskList;
