import React, { useCallback, useState } from 'react';
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
import TaskSort from 'src/components/task/components/TaskSort';
import DeleteTaskForm from 'src/components/task/components/DeleteTaskForm';
import TaskStore from 'src/stores/base.store';
import Loader from 'src/components/loader';
import { observer } from 'mobx-react';

interface TaskListProps {
  tasks: Task[];
  members?: User[];
  createTask: ModalHandler
  editTask: ModalHandler,
  deleteTask: ModalHandler,
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  members,
  createTask,
  editTask,
  deleteTask,
}) => {
  const { userStore, projectStore } = useStores();
  const [store, setStore] = useState<TaskStore>(userStore);
  const [editedTask, setEditedTask] = useState<Task>();
  const [deletedTask, setDeletedTask] = useState<Task | null>(null);
  const [listTasks, setListTasks] = useState<Task[]>(tasks);

  if (members) setStore(projectStore);

  const createTaskHandler = useCallback(async (createTaskDto: CreateTaskDto) => {
    try {
      await store.createTask(createTaskDto);
      toast.success(`Created task! ${createTaskDto.name}`);
    } catch (e) {
      toast.error(`Error occurred! ${store.error}`);
    } finally {
      createTask.close();
      setEditedTask(undefined);
    }
  }, [createTask, store]);

  const submitEditHandler = useCallback(async (taskId: number, updatedTask: UpdateTaskDto) => {
    try {
      await store.updateTask(taskId, updatedTask);
      toast.success(`Edited task! ${updatedTask.name}`);
    } catch (e) {
      toast.error(`Error occurred! ${store.error}`);
    } finally {
      editTask.close();
      setEditedTask(undefined);
    }
  }, [editTask, store]);

  const deleteTaskHandler = useCallback(async (taskId: number) => {
    try {
      await store.deleteTask(taskId);
      toast.success(`Deleted task! ${deletedTask?.name}`);
    } catch (e) {
      toast.error(`Error occurred! ${store.error}`);
    } finally {
      deleteTask.close();
      setDeletedTask(null);
    }
  }, [deleteTask, deletedTask?.name, store]);

  const onSort = (newTasks: Task[]) => {
    setListTasks(newTasks);
  };

  const onEditClick = (task: Task) => {
    setEditedTask(task);
  };

  const onDeleteClick = (task: Task) => {
    setDeletedTask(task);
  };

  if (store.isLoading) return <Loader />;

  return (
    <Box sx={styles.container}>
      {tasks.length === 0 ? (
        <Typography variant="body1">No tasks available</Typography>
      ) : (
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TaskSort isUserPage={!!members} onSort={onSort} tasks={listTasks} />
          </Grid>
          {listTasks.map(task => (
            <Grid item key={task.id} xs={6} md={4}>
              <TaskItem
                task={task}
                editTask={editTask}
                onEditClick={onEditClick}
                deleteTask={deleteTask}
                onDeleteClick={onDeleteClick}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <ModalForm open={createTask.isOpen} handleClose={createTask.close}>
        <CreateTaskForm
          onCancel={createTask.close}
          members={members}
          onSubmit={createTaskHandler}
          tasks={listTasks}
        />
      </ModalForm>
      <ModalForm open={editTask.isOpen} handleClose={editTask.close}>
        <EditTaskForm
          task={editedTask}
          members={members}
          tasks={listTasks}
          onCancel={editTask.close}
          onSubmit={submitEditHandler}
        />
      </ModalForm>
      <ModalForm open={deleteTask.isOpen} handleClose={deleteTask.close}>
        <DeleteTaskForm
          task={deletedTask}
          onDelete={deleteTaskHandler}
          onClose={deleteTask.close} />
      </ModalForm>
    </Box>
  );
};

export default observer(TaskList);
