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
import DeleteTaskForm from 'src/components/task/components/DeleteTaskModal';
import { observer } from 'mobx-react';
import { Project } from 'src/models/project.model';
import { UserStore } from 'src/stores/user.store';
import { isObjectEmpty } from 'src/utils/common/isObjectEmpty';

interface TaskListProps {
  isProjectPage: boolean,
  isEditable: boolean,
  isAdmin?: boolean,
  projectId?: number,
  createTask: ModalHandler,
  editTask: ModalHandler,
  deleteTask: ModalHandler,
}

const TaskList: React.FC<TaskListProps> = ({
  isProjectPage = false,
  isEditable = true,
  isAdmin = false,
  projectId,
  createTask,
  editTask,
  deleteTask,
}) => {
  const { userStore, projectStore, authStore } = useStores();
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [deletedTask, setDeletedTask] = useState<Task | null>(null);
  const store = projectId ? projectStore : userStore;

  useEffect(() => {
    if (isObjectEmpty(store.current)) {
      store.fetch(projectId ?? authStore.auth.user.id);
    }
  }, [authStore.auth.user.id, projectId, store]);

  const members = (store.current as Project).team?.members;
  const isProjectAdmin = isProjectPage && isAdmin;

  const createTaskHandler = useCallback(async (createTaskDto: CreateTaskDto) => {
    await store.createTask(createTaskDto);
    if (!store.error && !store.isLoading)  {
      createTask.close();
      toast.success(`Created task! ${createTaskDto.name}`);
    }
  }, [createTask, store]);

  const submitEditHandler = useCallback(async (taskId: number, updatedTask: UpdateTaskDto) => {
    await store.updateTask(taskId, updatedTask);
    if (!store.error && !store.isLoading)  {
      editTask.close();
      setEditedTask(null);
      toast.success(`Edited task! ${updatedTask.name}`);
    }
  }, [editTask, store]);

  const deleteTaskHandler = useCallback(async (taskId: number) => {
    await store.deleteTask(taskId);
    if (!store.error && !store.isLoading)  {
      deleteTask.close();
      setDeletedTask(null);
      toast.success(`Deleted task! ${deletedTask?.name}`);
    }
  }, [deleteTask, deletedTask?.name, store]);

  const toggleTaskHandler = useCallback(async (taskId: number) => {
    await store.toggleTask(taskId);
    if (!store.error && !store.isLoading)  {
      deleteTask.close();
      setDeletedTask(null);
      toast.success(`Toggled task!`);
    }
  }, [deleteTask, store]);

  const handleImportantTasks = useCallback(async () => {
    if (!isProjectPage) {
      await (store as UserStore).loadImportantTasks();
    }
  }, [isProjectPage, store]);

  const onSort = useCallback((newTasks: Task[]) => {
    store.sortTasks(newTasks);
  }, [store]);

  const onEditClick = (task: Task) => {
    setEditedTask(task);
  };

  const onDeleteClick = (task: Task) => {
    setDeletedTask(task);
  };

  return (
    <Box sx={styles.container}>
      {store.current.tasks.length === 0 ? (
        <Typography variant="h6" mt={2}>No tasks available</Typography>
      ) : (
        <Grid container spacing={2} mt={2} alignItems="stretch">
          <Grid item xs={12}>
            <TaskSort
              isEditable={isEditable}
              isProjectPage={isProjectPage}
              onSort={onSort}
              tasks={store.current.tasks}
              handleGetImportantTasks={handleImportantTasks}
            />
          </Grid>
          {store.current.tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              editTask={editTask}
              onEditClick={onEditClick}
              deleteTask={deleteTask}
              onDeleteClick={onDeleteClick}
              onToggle={toggleTaskHandler}
              isEditable={isEditable || isProjectAdmin}
            />
          ))}
        </Grid>
      )}
      <ModalForm open={createTask.isOpen} handleClose={createTask.close}>
        <CreateTaskForm
          onCancel={createTask.close}
          members={members}
          onSubmit={createTaskHandler}
          tasks={store.current.tasks}
        />
      </ModalForm>
      <ModalForm open={editTask.isOpen} handleClose={editTask.close}>
        <EditTaskForm
          task={editedTask}
          members={members}
          tasks={store.current.tasks}
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
