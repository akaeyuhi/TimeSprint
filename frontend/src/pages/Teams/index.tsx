import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import TeamItem from './components/TeamItem';
import { useStores } from 'src/hooks/use-stores';
import ModalForm from 'src/components/modalForm';
import CreateTeamForm from 'src/pages/Teams/components/CreateTeamForm';
import { CreateTeamDto } from 'src/pages/Teams/dto/create-team.dto';
import { styles } from 'src/pages/Teams/styles';

const TeamsPage: React.FC = () => {
  const { teamStore } = useStores();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTeam = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTeamSubmit = (teamDto: CreateTeamDto) => {
    // Perform submission logic here
    console.log('Creating team:', teamDto);
    handleCloseModal();
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
          onClick={handleCreateTeam}
          sx={styles.createButton}>
          Create Team
        </Button>
      </Box>
      {teamStore.teams.length === 0 ? (
        <Typography variant="body1">No teams available</Typography>
      ) : (
        <Grid container spacing={2} sx={{ mt: '0.5rem' }}>
          {teamStore.teams.map(team => (
            <Grid item xs={12} key={team.id}>
              <TeamItem team={team} />
            </Grid>
          ))}
        </Grid>
      )}
      <ModalForm open={isModalOpen} onClose={handleCloseModal}>
        <CreateTeamForm onSubmit={handleCreateTeamSubmit} onCancel={handleCloseModal} />
      </ModalForm>
    </Container>
  );
};

export default TeamsPage;
