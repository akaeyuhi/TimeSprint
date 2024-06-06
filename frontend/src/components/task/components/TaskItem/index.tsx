import React from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Task } from 'src/models/task.model';
import { ModalHandler } from 'src/hooks/use-modals';
import { styles } from 'src/components/task/components/TaskItem/styles';
import { observer } from 'mobx-react';

interface TaskItemProps {
  task: Task,
  editTask: ModalHandler,
  onEditClick: (task: Task) => void,
  onDeleteClick: (task: Task) => void,
  onToggle: (taskId: number) => void,
  deleteTask: ModalHandler,
  isEditable: boolean,
}

const TaskItem: React.FC<TaskItemProps> = ({
                                             task,
                                             editTask,
                                             onEditClick,
                                             onToggle,
                                             deleteTask,
                                             onDeleteClick,
                                             isEditable,
                                           }) => {


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

  return (
    <Grid item xs={6} md={4}>
      <Card sx={{ ...styles.card, ...(task.isCompleted && { textDecoration: 'line-through' }) }}>
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
              <Typography variant="body2" sx={{ color: task.urgency ? 'red' : 'green' }}>
                Urgency: {task.urgency ? 'High' : 'Low'}
              </Typography>
              <Typography variant="body2" sx={{ color: task.importance ? 'red' : 'green' }}>
                Importance: {task.importance ? 'High' : 'Low'}
              </Typography>
              <Typography variant="body2">
                Dependencies: {task.dependencies.length}
              </Typography>
            </Box>
            <Box>
              {task.user && (
                <Avatar src="#" alt={task.user.username} sx={{
                  width: 40,
                  height: 40,
                  mx: 'auto',
                  cursor: 'pointer',
                }} />
              )}
            </Box>
          </Box>
        </CardContent>
        {isEditable && <CardActions>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            variant={task.isCompleted ? 'outlined' : 'contained'}
            color="secondary"
            onClick={toggleTask}
          >
            {task.isCompleted ? 'Uncompleted' : 'Completed'}
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>}
      </Card>
    </Grid>
  );
};

export default observer(TaskItem);
