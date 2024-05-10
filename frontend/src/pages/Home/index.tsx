import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styles } from 'src/pages/Home/styles';
import { LeisureActivity } from 'src/models/activity.model';
import { Task } from 'src/models/task.model';
import LeisureActivityList from 'src/pages/Home/components/ActivityList';
import TaskList from 'src/pages/Home/components/TaskList';

// Mock data for tasks
const leisureActivities: LeisureActivity[] = [
  {
    id: 1,
    name: 'Reading',
    description: 'Read a book on your favorite topic.',
    startDate: new Date('2024-04-19T09:00:00'),
    endDate: new Date('2024-04-19T10:00:00'),
    isCompleted: false,
  },
  {
    id: 2,
    name: 'Walking',
    description: 'Take a walk in the park to relax.',
    startDate: new Date('2024-04-19T10:30:00'),
    endDate: new Date('2024-04-19T11:30:00'),
    isCompleted: false,
  },
];

const tasks: Task[] = [
  {
    id: 1,
    name: 'Complete project proposal',
    description: 'Prepare and submit the project proposal by the deadline.',
    urgency: true,
    importance: true,
    startDate: new Date('2024-04-19T13:00:00'),
    endDate: new Date('2024-04-19T15:00:00'),
    isCompleted: false,
    dependencies: [],
  },
  {
    id: 2,
    name: 'Review meeting notes',
    description: 'Review the notes from yesterday\'s team meeting.',
    urgency: false,
    importance: true,
    startDate: new Date('2024-04-19T15:30:00'),
    endDate: new Date('2024-04-19T16:30:00'),
    isCompleted: false,
    dependencies: [],
  },
];


const HomePage: React.FC = () => {
  const currentDate = new Date();
  const [username] = useState('Test');
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Box>
        <Typography variant="h4" sx={styles.greeting}>
            Hello, {username}!
        </Typography>
        <Typography variant="h6" sx={styles.date}>
            Today is {formattedDate}.
        </Typography>
        <Box>
          <TaskList tasks={tasks}/>
        </Box>
        {/*<Box>*/}
        {/*  <LeisureActivityList leisureActivities={leisureActivities}/>*/}
        {/*</Box>*/}
      </Box>
    </Container>
  );
};

export default HomePage;
