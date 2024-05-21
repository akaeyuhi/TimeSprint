import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TaskItem from '../TaskItem';
import { Task } from 'src/models/task.model';
import { ModalHandler } from 'src/hooks/use-modals';
import { CreateTaskDto } from 'src/services/dto/task/create-task.dto';
import { toast } from 'react-toastify';
import EditTaskForm from 'src/components/task/components/EditTaskForm';
import ModalForm from 'src/components/modalForm';
import CreateTaskForm from 'src/components/task/components/CreateTaskForm';
import { UpdateTaskDto } from 'src/services/dto/task/update-task.dto';
import { useStores } from 'src/hooks';
import { styles } from 'src/components/task/components/TaskList/styles';
import TaskSort from 'src/components/task/components/TaskSort';
import DeleteTaskForm from 'src/components/task/components/DeleteTaskForm';
import TaskStore from 'src/stores/task.store';
import Loader from 'src/components/loader';
import { observer } from 'mobx-react';
import { TaskContainer } from 'src/models/task-container.model';
import { Project } from 'src/models/project.model';

interface TaskListProps {
  isProjectPage: boolean,
  createTask: ModalHandler,
  editTask: ModalHandler,
  deleteTask: ModalHandler,
  taskCount?: number,
}

const TaskList: React.FC<TaskListProps> = ({
  isProjectPage,
  createTask,
  editTask,
  deleteTask,
  taskCount,
}) => {
  const { userStore, projectStore } = useStores();
  const [store, setStore] = useState<TaskStore<TaskContainer>>(userStore);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [deletedTask, setDeletedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (isProjectPage) setStore(projectStore);
  }, [isProjectPage, projectStore]);

  useEffect(() => {
    store.fetch();
  }, []);

  const members = (store.current as Project).team?.members;

  const createTaskHandler = useCallback(async (createTaskDto: CreateTaskDto) => {
    try {
      await store.createTask(createTaskDto);
      toast.success(`Created task! ${createTaskDto.name}`);
    } catch (e) {
      toast.error(`Error occurred! ${store.error}`);
    } finally {
      createTask.close();
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
      setEditedTask(null);
    }
  }, [editTask, store]);

  const deleteTaskHandler = useCallback(async (taskId: number) => {
    try {
      await store.deleteTask(taskId);
      toast.success(`Deleted task! ${deletedTask?.name}`);
    } catch (e) {
      console.error(e);
      toast.error(`Error occurred! ${store.error}`);
    } finally {
      deleteTask.close();
      setDeletedTask(null);
    }
  }, [deleteTask, deletedTask?.name, store]);

  const toggleTaskHandler = useCallback(async (taskId: number) => {
    try {
      await store.toggleTask(taskId);
      toast.success(`Toggled task!`);
    } catch (e) {
      console.error(e);
      toast.error(`Error occurred! ${store.error}`);
    }
  }, [store]);

  const onSort = (newTasks: Task[]) => {
    store.sortTasks(newTasks);
  };

  const onEditClick = (task: Task) => {
    setEditedTask(task);
  };

  const onDeleteClick = (task: Task) => {
    setDeletedTask(task);
  };

  if (store.isLoading || !store.tasks) return <Loader />;

  return (
    <Box sx={styles.container}>
      {store.tasks.length === 0 ? (
        <Typography variant="body1">No tasks available</Typography>
      ) : (
        <Grid container spacing={2} mt={1} alignItems="stretch">
          <Grid item xs={12}>
            <TaskSort isUserPage={!isProjectPage} onSort={onSort} tasks={store.tasks} />
          </Grid>
          {store.tasks.slice(0, taskCount ?? store.tasks.length).map(task => (
            <TaskItem
              key={task.id}
              task={task}
              editTask={editTask}
              onEditClick={onEditClick}
              deleteTask={deleteTask}
              onDeleteClick={onDeleteClick}
              onToggle={toggleTaskHandler}
            />
          ))}
        </Grid>
      )}
      <ModalForm open={createTask.isOpen} handleClose={createTask.close}>
        <CreateTaskForm
          onCancel={createTask.close}
          members={members}
          onSubmit={createTaskHandler}
          tasks={store.tasks}
        />
      </ModalForm>
      <ModalForm open={editTask.isOpen} handleClose={editTask.close}>
        <EditTaskForm
          task={editedTask}
          members={members}
          tasks={store.tasks}
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
