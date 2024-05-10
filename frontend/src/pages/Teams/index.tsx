import React, { useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useStores } from 'src/hooks/use-stores';
import ModalForm from 'src/components/modalForm';
import CreateTeamForm from 'src/pages/Teams/components/CreateTeamForm';
import { CreateTeamDto } from 'src/dto/team/create-team.dto';
import { styles } from 'src/pages/Teams/styles';
import TeamList from 'src/components/team/TeamList';
import { useModals } from 'src/hooks/use-modals';

interface TeamModals {
  createTeam: boolean
}

const TeamsPage: React.FC = () => {
  const { teamStore } = useStores();
  const [modal, setModal] = useState({
    createTeam: false
  });

  const modalHandlers = useModals<TeamModals>(modal, setModal);

  const handleCreateTeamSubmit = (teamDto: CreateTeamDto) => {
    // Perform submission logic here
    console.log('Creating team:', teamDto);
    modalHandlers.createTeam.close();
  };

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
      <TeamList teams={teamStore.teams}/>
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

export default TeamsPage;
