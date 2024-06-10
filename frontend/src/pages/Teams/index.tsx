import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useStores } from 'src/hooks/use-stores';
import ModalForm from 'src/components/modalForm';
import CreateTeamForm from 'src/pages/Teams/components/CreateTeamForm';
import { CreateTeamDto } from 'src/services/dto/team/create-team.dto';
import { styles } from 'src/pages/Teams/styles';
import TeamList from 'src/components/team/TeamList';
import { useModals } from 'src/hooks/use-modals';
import Loader from 'src/components/loader';
import { observer } from 'mobx-react';
import { catchWrapper } from 'src/utils/common/catchWrapper';
import { isObjectEmpty } from 'src/utils/common/isObjectEmpty';

interface TeamModals {
  createTeam: boolean;
}

const TeamsPage: React.FC = () => {
  const { authStore, userStore, handler } = useStores();
  const [modal, setModal] = useState({
    createTeam: false,
  });

  useEffect(() => {
    userStore.fetch(authStore.auth.user.id);
  }, [authStore.auth.user.id, userStore]);

  const modalHandlers = useModals<TeamModals>(modal, setModal);

  const handleCreateTeamSubmit = useCallback((teamDto: CreateTeamDto) =>
    catchWrapper(
      async () => await userStore.createTeam(teamDto),
      `Created team: ${teamDto.name}`,
      `Error!: ${userStore.error}`,
      modalHandlers.createTeam,
    )(), [modalHandlers.createTeam, userStore]);

  if (userStore.isLoading || isObjectEmpty(userStore.current)) return <Loader />;
  if (userStore.error) handler.handle(userStore.error.message);

  return (
    <Container>
      <Box sx={styles.container}>
        <Box sx={{ height: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            Your Teams
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={modalHandlers.createTeam.open}
          sx={styles.createButton}>
          Create Team
        </Button>
      </Box>
      <TeamList teams={userStore.current.teams} />
      <ModalForm
        open={modalHandlers.createTeam.isOpen}
        handleClose={modalHandlers.createTeam.close}
      >
        <CreateTeamForm
          onSubmit={handleCreateTeamSubmit}
          onCancel={modalHandlers.createTeam.close}
        />
      </ModalForm>
    </Container>
  );
};

export default observer(TeamsPage);
