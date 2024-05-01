import { Button, Card, CardContent, Typography } from '@mui/material';
import { styles } from 'src/pages/Teams/components/TeamItem/styles';
import { Team } from 'src/models/team.model';

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
    <Button variant="contained" color="primary" sx={{ mt: 1 }}>
          Go to Team Page
    </Button>
  </Card>
);

export default TeamItem;
