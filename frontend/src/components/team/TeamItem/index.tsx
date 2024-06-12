import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { styles } from 'src/components/team/TeamItem/styles';
import { Team } from 'src/models/team.model';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

interface TeamItemProps {
  team: Team;
}

const TeamItem: React.FC<TeamItemProps> = ({ team }) => (
  <Card sx={styles.card}>
    <CardContent>
      <Typography variant="h6">{team.name}</Typography>
      <Typography variant="body2">{team.description}</Typography>
      <Typography variant="body2">Members: {team.members.length}</Typography>
      <Typography variant="body2">Admins: {team.admins.length}</Typography>
      <Typography variant="body2">Projects: {team.projects.length}</Typography>
    </CardContent>
    <CardActions>
      <Link to={`./${team.id}`} relative="path">
        <Button variant="contained" color="primary" sx={{ mt: 1 }}>
          Go to Team Page
        </Button>
      </Link>
    </CardActions>
  </Card>
);

export default observer(TeamItem);
