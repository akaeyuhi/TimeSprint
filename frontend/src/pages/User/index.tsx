import React, { useEffect, useState } from "react";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import TeamList from "src/components/team/TeamList";
import { useStores } from "src/hooks";
import { observer } from "mobx-react";
import Loader from "src/components/loader";
import { useParams } from "react-router-dom";
import { isObjectEmpty } from "src/utils/common/isObjectEmpty";
import { User } from "src/models/user.model";
import { stringAvatar } from "src/utils/common/stringAvatar";
import { styles } from "src/pages/User/style";

const UserPage: React.FC = () => {
  const { userStore: store, authStore, handler } = useStores();
  const [user, setUser] = useState({} as User);
  const { id } = useParams();

  const userId = id ? id : authStore.auth.user.id;
  const isOwnPage = userId === authStore.auth?.user?.id;

  useEffect(() => {
    if (isOwnPage && isObjectEmpty(store.current)) {
      store.fetch(userId).then(() => {
        setUser(store.current);
      });
    } else if (isOwnPage) {
      setUser(store.current);
    } else {
      store.getUser(userId).then((user) => {
        if (user) setUser(user);
      });
    }
  }, [isOwnPage, store, userId]);

  if (store.isLoading || isObjectEmpty(user)) return <Loader />;
  if (store.error) handler.handle(store.error.message);

  const getWelcomeText = isOwnPage
    ? `Welcome, ${user && user.username}`
    : `${user && user.username}'s page`;

  return (
    <Container>
      <Typography variant="h4">{getWelcomeText}</Typography>
      <Box sx={styles.description}>
        <Box>
          <Avatar {...stringAvatar(user.username)} sx={styles.avatar} />
        </Box>
        <Box ml={5}>
          <Typography variant="h5">{user.username}&apos;s stats:</Typography>
          <Typography variant="h6">Total teams: {user.teams.length}</Typography>
          <Typography variant="h6">Total tasks: {user.tasks.length}</Typography>
          <Typography variant="h6">
            Total activities: {user.activities.length}
          </Typography>
        </Box>
      </Box>
      <Stack sx={styles.teamStack} mt={2}>
        <Typography variant="h5">Teams this user is a part of:</Typography>
        <TeamList teams={user.teams.slice(0, 2)} />
      </Stack>
    </Container>
  );
};

export default observer(UserPage);
