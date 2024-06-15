import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { ModalHandler } from 'src/hooks/use-modals';
import { styles } from 'src/components/task/TaskItem/styles';
import { observer } from 'mobx-react';
import { LeisureActivity } from 'src/models/activity.model';

interface ActivityItemProps {
  item: LeisureActivity;
  editActivity: ModalHandler;
  deleteActivity: ModalHandler;
  onEditClick: (activity: LeisureActivity) => void;
  onDeleteClick: (activity: LeisureActivity) => void;
  onToggle: (activityId: string) => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  item: activity,
  editActivity,
  deleteActivity,
  onEditClick,
  onToggle,
  onDeleteClick,
}) => {
  const toggle = () => {
    onToggle(activity.id);
  };

  const handleEdit = () => {
    editActivity.open();
    onEditClick(activity);
  };

  const handleDelete = () => {
    deleteActivity.open();
    onDeleteClick(activity);
  };

  return (
    <Grid item xs={6} md={4}>
      <Card
        sx={{
          ...styles.card,
          ...(activity.isCompleted && { textDecoration: 'line-through' }),
        }}
      >
        <CardContent>
          <Box sx={styles.descriptionContainer}>
            <Box>
              <Typography variant="h6">{activity.name}</Typography>
              <Typography variant="body2">{activity.description}</Typography>
              <Typography variant="body2" sx={{ color: 'green' }}>
                Started: {activity.startDate.toDateString()}
              </Typography>
              <Typography variant="body2" sx={{ color: 'red' }}>
                Due: {activity.endDate.toDateString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            variant={activity.isCompleted ? 'outlined' : 'contained'}
            color="secondary"
            onClick={toggle}
          >
            {activity.isCompleted ? 'Uncompleted' : 'Completed'}
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default observer(ActivityItem);
