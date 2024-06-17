import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Task } from 'src/models/task.model';
import { styles } from 'src/pages/Home/components/TaskItem/styles';
import { Link } from 'react-router-dom';

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => (
  <Card sx={styles.card}>
    <CardContent>
      <Typography variant="h6">{task.name}</Typography>
      <Typography variant="body2">{task.description}</Typography>
      <Typography variant="body2" sx={{ color: 'green' }}>
        Started: {task.startDate.toDateString()}
      </Typography>
      <Typography variant="body2" sx={{ color: 'red' }}>
        Due: {task.endDate.toDateString()}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: task.urgency ? 'red' : 'green' }}
      >
        Urgency: {task.urgency ? 'High' : 'Low'}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: task.importance ? 'red' : 'green' }}
      >
        Importance: {task.importance ? 'High' : 'Low'}
      </Typography>
    </CardContent>
    <CardActions>
      <Link to="/app/tasks">
        <Button variant="contained" color="primary">
          To Tasks
        </Button>
      </Link>
    </CardActions>
  </Card>
);

export default TaskItem;
