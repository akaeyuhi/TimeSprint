import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import ActivityItem from '../ActivityItem';
import { LeisureActivity } from 'src/models/activity.model';

interface Props {
  leisureActivities: LeisureActivity[];
}

const LeisureActivityList: React.FC<Props> = ({ leisureActivities }) => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Leisure Activities to do today
    </Typography>
    <List sx={{ display: 'flex' }}>
      {leisureActivities.map(activity => (
        <ListItem key={activity.id}>
          <ActivityItem activity={activity} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default LeisureActivityList;
