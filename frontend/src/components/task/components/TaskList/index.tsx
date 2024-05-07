import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TaskItem from '../TaskItem';
import { Task } from 'src/models/task.model';
import { ModalHandler } from 'src/hooks/use-modals';
import { CreateTaskDto } from 'src/dto/task/create-task.dto';
import { toast } from 'react-toastify';
import EditTaskForm from 'src/components/task/components/EditTaskForm';
import ModalForm from 'src/components/modalForm';
import CreateTaskForm from 'src/components/task/components/CreateTaskForm';
import { UpdateTaskDto } from 'src/dto/task/update-task.dto';
import { useStores } from 'src/hooks';
import { styles } from 'src/components/task/components/TaskList/styles';
import { User } from 'src/models/user.model';

interface TaskListProps {
  tasks: Task[];
  members?: User[];
  editTaskModalOpen: boolean,
  createTaskModalOpen: boolean,
  createTask: ModalHandler
  editTask: ModalHandler,
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  members,
  editTaskModalOpen,
  createTaskModalOpen,
  createTask,
  editTask,
}) => {
  const { taskStore } = useStores();
  const [editedTask, setEditedTask] = useState<Task>();

  const createTaskHandler = (createTaskDto: CreateTaskDto) => {
    console.log('created task', createTaskDto);
    toast.success(`Created task! ${createTaskDto.name}`);
    createTask.close();
  };
  const submitEditHandler = (taskId: number, updatedTask: UpdateTaskDto) => {
    const task = taskStore.tasks.find(task => task.id === taskId);
    if (task) {
      Object.assign(task, updatedTask);
      toast.success(`Updated task! ${updatedTask.name}`);
      console.log(task);
    }
    editTask.close();
    setEditedTask(undefined);
  };

  const onEditClick = (task: Task) => {
    setEditedTask(task);
  };
  return (
    <Box sx={styles.container}>
      {tasks.length === 0 ? (
        <Typography variant="body1">No tasks available</Typography>
      ) : (
        <Grid container spacing={2} mt={1} >
          {tasks.map(task => (
            <Grid item key={task.id} xs={6} md={4}>
              <TaskItem
                task={task}
                editTask={editTask}
                onEditClick={onEditClick}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <ModalForm open={createTaskModalOpen} handleClose={createTask.close}>
        <CreateTaskForm
          onCancel={createTask.close}
          members={members}
          onSubmit={createTaskHandler}
          tasks={tasks}
        />
      </ModalForm>
      <ModalForm open={editTaskModalOpen} handleClose={editTask.close}>
        <EditTaskForm
          task={editedTask}
          members={members}
          tasks={tasks}
          onCancel={editTask.close}
          onSubmit={submitEditHandler}
        />
      </ModalForm>
    </Box>
  );
};

export default TaskList;
