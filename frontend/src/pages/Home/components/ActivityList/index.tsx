import React from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import ActivityItem from '../ActivityItem';
import { LeisureActivity } from 'src/models/activity.model';
import { Link } from 'react-router-dom';

interface Props {
  leisureActivities: LeisureActivity[];
}

const LeisureActivityList: React.FC<Props> = ({ leisureActivities }) => (
  <Box mt={2}>
    {leisureActivities && leisureActivities.length ? (
      <>
        <Typography variant="h5" gutterBottom>
          Leisure Activities to do today
        </Typography>
        <List sx={{ display: 'flex' }}>
          {leisureActivities.map((activity) => (
            <ListItem key={activity.id}>
              <ActivityItem activity={activity} />
            </ListItem>
          ))}
        </List>
      </>
    ) : (
      <>
        <Typography variant="h5" gutterBottom mb={2}>
          No leisure activities planned. Maybe you should create one?
        </Typography>
        <Link to="/app/activities">
          <Button variant="contained" color="primary">
            To activities page
          </Button>
        </Link>
      </>
    )}
  </Box>
);

export default LeisureActivityList;
