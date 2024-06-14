import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { LeisureActivity } from 'src/models/activity.model';
import ItemList from 'src/components/itemList';
import ActivityItem from 'src/pages/Activities/components/ActivityItem';
import { ModalHandler, useStores } from 'src/hooks';
import { isObjectEmpty } from 'src/utils/common/isObjectEmpty';
import { toast } from 'react-toastify';
import { LeisureActivityDto } from 'src/services/dto/activity.dto';
import { Box } from '@mui/material';
import ModalForm from 'src/components/modalForm';
import ActivityForm from 'src/pages/Activities/components/ActivityForm';
import DeleteActivityModal from 'src/pages/Activities/components/DeleteActivityModal';

interface ActivityListProps {
  createActivity: ModalHandler;
  editActivity: ModalHandler;
  deleteActivity: ModalHandler;
}

const ActivityList: React.FC<ActivityListProps> = ({
  createActivity,
  editActivity,
  deleteActivity,
}) => {
  const { userStore: store, authStore } = useStores();
  const [edited, setEdited] = useState<LeisureActivity | null>(null);
  const [deleted, setDeleted] = useState<LeisureActivity | null>(null);

  useEffect(() => {
    if (isObjectEmpty(store.current)) {
      store.fetch(authStore.auth.user.id);
    }
  }, [authStore.auth.user.id, store]);

  const createHandler = useCallback(
    async (createTaskDto: LeisureActivityDto) => {
      await store.createActivity(createTaskDto);
      if (!store.error && !store.isLoading) {
        createActivity.close();
        toast.success(`Created activity! ${createTaskDto.name}`);
      }
    },
    [createActivity, store]
  );

  const editHandler = useCallback(
    async (updatedActivity: LeisureActivityDto, activityId?: number) => {
      await store.updateActivity(activityId!, updatedActivity);
      if (!store.error && !store.isLoading) {
        editActivity.close();
        setEdited(null);
        toast.success(`Edited activity! ${updatedActivity.name}`);
      }
    },
    [editActivity, store]
  );

  const deleteHandler = useCallback(
    async (activityId: number) => {
      await store.deleteActivity(activityId);
      if (!store.error && !store.isLoading) {
        deleteActivity.close();
        setDeleted(null);
        toast.success(`Deleted activity! ${deleted?.name}`);
      }
    },
    [deleteActivity, deleted?.name, store]
  );

  const onToggle = useCallback(
    async (activityId: number) => {
      await store.toggleActivity(activityId);
      if (!store.error && !store.isLoading) {
        toast.success(`Toggled activity!`);
      }
    },
    [store]
  );

  const onEditClick = (activity: LeisureActivity) => {
    setEdited(activity);
  };

  const onDeleteClick = (activity: LeisureActivity) => {
    setDeleted(activity);
  };

  return (
    <Box>
      <ItemList<LeisureActivity>
        items={store.current.activities}
        ItemComponent={ActivityItem}
        itemComponentProps={{
          onEditClick,
          onDeleteClick,
          onToggle,
          editActivity,
          deleteActivity,
        }}
      />
      <ModalForm
        open={createActivity.isOpen}
        handleClose={createActivity.close}
      >
        <ActivityForm
          onCancel={createActivity.close}
          onSubmit={createHandler}
          activity={null}
        />
      </ModalForm>
      <ModalForm open={editActivity.isOpen} handleClose={editActivity.close}>
        <ActivityForm
          activity={edited}
          onCancel={editActivity.close}
          onSubmit={editHandler}
          isEdited={true}
        />
      </ModalForm>
      <ModalForm
        open={deleteActivity.isOpen}
        handleClose={deleteActivity.close}
      >
        <DeleteActivityModal
          activity={deleted}
          onDelete={deleteHandler}
          onClose={deleteActivity.close}
        />
      </ModalForm>
    </Box>
  );
};

export default observer(ActivityList);
