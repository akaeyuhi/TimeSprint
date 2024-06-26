import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Task } from 'src/models/task.model';
import { ModalHandler } from 'src/hooks/use-modals';
import { styles } from 'src/components/task/TaskItem/styles';
import { observer } from 'mobx-react';

interface TaskItemProps {
  item: Task;
  editTask: ModalHandler;
  onEditClick: (task: Task) => void;
  onDeleteClick: (task: Task) => void;
  onToggle: (taskId: string) => void;
  deleteTask: ModalHandler;
  isOwnPage: boolean;
  isProjectAdmin: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  item: task,
  editTask,
  onEditClick,
  onToggle,
  deleteTask,
  onDeleteClick,
  isOwnPage,
  isProjectAdmin,
}) => {
  const parsedDependencies = task.dependencies
    .slice(0, 5)
    .map((task) => task.name)
    .join(', ');
  const checkLength = (length = 0) => task.dependencies.length > length;

  const toggleTask = () => {
    onToggle(task.id);
  };

  const handleEdit = () => {
    editTask.open();
    onEditClick(task);
  };

  const handleDelete = () => {
    deleteTask.open();
    onDeleteClick(task);
  };

  const isEditable = (isOwnPage && task.isOwnTask) || isProjectAdmin;

  return (
    <Grid item xs={6} md={4}>
      <Card
        sx={{
          ...styles.card,
          ...(task.isCompleted && { textDecoration: 'line-through' }),
        }}
      >
        <CardContent>
          <Box sx={styles.descriptionContainer}>
            <Box>
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
              <Typography
                variant="body2"
                sx={{ color: checkLength(3) ? 'red' : 'green' }}
              >
                {checkLength()
                  ? `Dependencies: ${parsedDependencies}`
                  : 'No dependencies'}
              </Typography>
            </Box>
            <Box>
              {task.user && (
                <Avatar
                  src="#"
                  alt={task.user.username}
                  sx={{
                    width: 40,
                    height: 40,
                    mx: 'auto',
                    cursor: 'pointer',
                  }}
                />
              )}
            </Box>
          </Box>
        </CardContent>

        <CardActions>
          {isEditable && (
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
          )}
          <Button
            variant={task.isCompleted ? 'outlined' : 'contained'}
            color="secondary"
            onClick={toggleTask}
          >
            {task.isCompleted ? 'Uncompleted' : 'Completed'}
          </Button>
          {isEditable && (
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default observer(TaskItem);
