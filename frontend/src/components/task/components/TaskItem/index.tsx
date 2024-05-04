import React from 'react';
import { Avatar, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Task } from 'src/models/task.model';
import ModalForm from 'src/components/modalForm';
import EditTaskForm from '../EditTaskForm';
import { ModalHandler } from 'src/hooks/use-modals';
import { styles } from 'src/components/task/components/TaskItem/styles';
import { UpdateTaskDto } from 'src/dto/task/update-task.dto';

interface TaskItemProps {
  task: Task;
  editTask: ModalHandler,
  editTaskModalOpen: boolean,
  onToggle: () => void,
  onSubmit: (updateTaskDto: UpdateTaskDto) => void,
}

const TaskItem: React.FC<TaskItemProps> = ({ task,
  editTask,
  editTaskModalOpen,
  onToggle,
  onSubmit }) => (
  <>
    <Card sx={{ ...styles.card, ...(task.isCompleted && { textDecoration: 'line-through' }) }}>
      <CardContent>
        <Typography variant="h6">{task.name}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="body2">Due: {task.endDate.toDateString()}</Typography>
        <Typography variant="body2">Urgency: {task.urgency ? 'High' : 'Low'}</Typography>
        <Typography variant="body2">Importance: {task.importance ? 'High' : 'Low'}</Typography>
        {task.user && (
          <Avatar src="#" alt={task.user.username} sx={{
            width: 60,
            height: 60,
            mx: 'auto',
            cursor: 'pointer'
          }} />
        )}
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={editTask.open}>
              Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onToggle}
        >
          {task.isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
        </Button>
      </CardActions>
    </Card>
    <ModalForm open={editTaskModalOpen} handleClose={editTask.close}>
      <EditTaskForm task={task} onCancel={editTask.close}  onSubmit={onSubmit}/>
    </ModalForm>
  </>
);

export default TaskItem;
