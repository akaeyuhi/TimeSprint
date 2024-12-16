import React, { useEffect } from "react";
import { Container } from "@mui/material";
import TaskSection from "src/components/task/TaskSection";
import { observer } from "mobx-react";
import { isObjectEmpty } from "src/utils/common/isObjectEmpty";
import Loader from "src/components/loader";
import { useStores } from "src/hooks";

const TaskPage = () => {
  const { userStore: store, authStore, handler } = useStores();

  useEffect(() => {
    if (isObjectEmpty(store.current)) {
      store.fetch(authStore.auth.user.id);
    }
  }, [authStore.auth.user.id, store]);

  if (store.isLoading || isObjectEmpty(store.current)) return <Loader />;
  if (store.error) handler.handle(store.error.message);

  return (
    <Container>
      <TaskSection isProjectPage={false} isEditable />
    </Container>
  );
};

export default observer(TaskPage);
