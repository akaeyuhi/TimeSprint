import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { LeisureActivity } from 'src/models/activity.model';
import { styles } from 'src/pages/Home/components/TaskItem/styles';

interface Props {
  activity: LeisureActivity;
}

const ActivityItem: React.FC<Props> = ({ activity }) => (
  <Card sx={styles.card}>
    <CardContent>
      <Typography variant="h6">{activity.name}</Typography>
      <Typography variant="body2">{activity.description}</Typography>
      <Typography variant="body2">Due: {activity.endDate.toDateString()}</Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" color="primary">
          To Activity
      </Button>
    </CardActions>
  </Card>
);

export default ActivityItem;
