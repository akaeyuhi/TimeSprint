import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { styles } from 'src/components/team/TeamItem/styles';
import { Team } from 'src/models/team.model';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import React from 'react';

interface TeamItemProps {
  item: Team;
  isTeamPage: boolean;
}

const TeamItem: React.FC<TeamItemProps> = ({ item: team, isTeamPage }) => (
  <Grid item xs={12}>
    <Card sx={styles.card}>
      <CardContent>
        <Typography variant="h6">{team.name}</Typography>
        <Typography variant="body2">{team.description}</Typography>
        <Typography variant="body2">Members: {team.members.length}</Typography>
        <Typography variant="body2">Admins: {team.admins.length}</Typography>
        <Typography variant="body2">
          Projects: {team.projects.length}
        </Typography>
      </CardContent>
      {isTeamPage && (
        <CardActions>
          <Link to={`./${team.id}`} relative="path">
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              Go to Team Page
            </Button>
          </Link>
        </CardActions>
      )}
    </Card>
  </Grid>
);

export default observer(TeamItem);
