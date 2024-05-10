import React from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Task } from 'src/models/task.model';
import { ModalHandler } from 'src/hooks/use-modals';
import { styles } from 'src/components/task/components/TaskItem/styles';
import { toast } from 'react-toastify';

interface TaskItemProps {
  task: Task;
  editTask: ModalHandler,
  deleteTask: ModalHandler,
  onEditClick: (task: Task) => void,
  onDeleteClick: (task: Task) => void,
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  editTask,
  deleteTask,
  onEditClick,
  onDeleteClick,
}) => {


  const toggleTask = () => {
    task.isCompleted = !task.isCompleted;
    toast.success(task.isCompleted);
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
    <>
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
        <CardActions>
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
        </CardActions>
      </Card>
    </>
  );
};

export default TaskItem;
