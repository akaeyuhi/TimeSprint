import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import TaskItem from 'src/components/task/TaskItem';
import { Task } from 'src/models/task.model';
import { ModalHandler } from 'src/hooks/use-modals';
import { TaskDto } from 'src/services/dto/task.dto';
import { toast } from 'react-toastify';
import ModalForm from 'src/components/modalForm';
import { useStores } from 'src/hooks';
import { styles } from 'src/components/task/TaskList/styles';
import TaskSort from 'src/components/task/TaskSort';
import DeleteTaskForm from 'src/components/task/DeleteTaskModal';
import { observer } from 'mobx-react';
import { Project } from 'src/models/project.model';
import { UserStore } from 'src/stores/user.store';
import { isObjectEmpty } from 'src/utils/common/isObjectEmpty';
import { SortBy } from 'src/utils/common/sortBy';
import TaskForm from 'src/components/task/TaskForm';
import ItemList from 'src/components/itemList';

interface TaskListProps {
  isProjectPage: boolean;
  isEditable: boolean;
  isAdmin?: boolean;
  projectId?: number;
  createTask: ModalHandler;
  editTask: ModalHandler;
  deleteTask: ModalHandler;
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

  const createTaskHandler = useCallback(
    async (createTaskDto: TaskDto) => {
      await store.createTask(createTaskDto);
      if (!store.error && !store.isLoading) {
        createTask.close();
        toast.success(`Created task! ${createTaskDto.name}`);
      }
    },
    [createTask, store]
  );

  const submitEditHandler = useCallback(
    async (updatedTask: TaskDto, taskId?: number) => {
      await store.updateTask(taskId!, updatedTask);
      if (!store.error && !store.isLoading) {
        editTask.close();
        setEditedTask(null);
        toast.success(`Edited task! ${updatedTask.name}`);
      }
    },
    [editTask, store]
  );

  const deleteTaskHandler = useCallback(
    async (taskId: number) => {
      await store.deleteTask(taskId);
      if (!store.error && !store.isLoading) {
        deleteTask.close();
        setDeletedTask(null);
        toast.success(`Deleted task! ${deletedTask?.name}`);
      }
    },
    [deleteTask, deletedTask?.name, store]
  );

  const onToggle = useCallback(
    async (taskId: number) => {
      await store.toggleTask(taskId);
      if (!store.error && !store.isLoading) {
        deleteTask.close();
        setDeletedTask(null);
        toast.success(`Toggled task!`);
      }
    },
    [deleteTask, store]
  );

  const handleImportantTasks = useCallback(async () => {
    if (!isProjectPage) {
      await (store as UserStore).loadImportantTasks();
    }
  }, [isProjectPage, store]);

  const onSort = useCallback(
    (sortBy: SortBy) => {
      store.sortTasks(sortBy);
    },
    [store]
  );

  const onEditClick = (task: Task) => {
    setEditedTask(task);
  };

  const onDeleteClick = (task: Task) => {
    setDeletedTask(task);
  };

  return (
    <Box sx={styles.container}>
      <ItemList<Task>
        items={store.tasks}
        ItemComponent={TaskItem}
        itemComponentProps={{
          editTask,
          onEditClick,
          deleteTask,
          onDeleteClick,
          onToggle,
          isOwnPage: isEditable,
          isProjectAdmin,
        }}
      >
        <Grid item xs={12}>
          <TaskSort
            isEditable={isEditable}
            isProjectPage={isProjectPage}
            onSort={onSort}
            tasks={store.tasks}
            handleGetImportantTasks={handleImportantTasks}
          />
        </Grid>
      </ItemList>
      <ModalForm open={createTask.isOpen} handleClose={createTask.close}>
        <TaskForm
          onCancel={createTask.close}
          members={members}
          onSubmit={createTaskHandler}
          tasks={store.tasks}
          task={null}
        />
      </ModalForm>
      <ModalForm open={editTask.isOpen} handleClose={editTask.close}>
        <TaskForm
          task={editedTask}
          members={members}
          tasks={store.tasks}
          onCancel={editTask.close}
          onSubmit={submitEditHandler}
          isEdited={true}
        />
      </ModalForm>
      <ModalForm open={deleteTask.isOpen} handleClose={deleteTask.close}>
        <DeleteTaskForm
          task={deletedTask}
          onDelete={deleteTaskHandler}
          onClose={deleteTask.close}
        />
      </ModalForm>
    </Box>
  );
};

export default observer(TaskList);
