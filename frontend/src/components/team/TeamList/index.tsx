import { Grid, Typography } from '@mui/material';
import TeamItem from 'src/components/team/TeamItem';
import React from 'react';
import { Team } from 'src/models/team.model';
import { observer } from 'mobx-react';

interface TeamListProps {
  teams: Team[];
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => (
  <>
    {!teams || teams.length === 0 ? (
      <Typography variant="h5" sx={{ mt: '1rem' }}>
        No teams available
      </Typography>
    ) : (
      <Grid container spacing={2} sx={{ mt: '1rem' }}>
        {teams.map((team) => (
          <Grid item xs={12} key={team.id}>
            <TeamItem team={team} />
          </Grid>
        ))}
      </Grid>
    )}
  </>
);

export default observer(TeamList);
