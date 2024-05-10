import React, { useEffect, useState } from 'react';
import { Typography, Container, Stack } from '@mui/material';
import TaskSection from 'src/components/task/components/TaskSection';
import { Task } from 'src/models/task.model';
import { Team } from 'src/models/team.model';
import TeamList from 'src/components/team/TeamList';
import { useStores } from 'src/hooks';
import { User } from 'src/models/user.model';

const UserPage: React.FC = () => {
  const { taskStore, teamStore } = useStores();

  const [user, setUser] = useState<User>({
    id: 3,
    username: 'alice_smith',
    email: 'alice@example.com'
  } as User);
  const [tasks, setTasks] = useState<Task[]>(taskStore.tasks);
  const [teams, setTeams] = useState<Team[]>(teamStore.teams);

  // useEffect(() => {
  //
  // }, []);

  return (
    <Container>
      <Typography variant="h4">Welcome, {user && user.username}</Typography>
      <Stack mt={4}>
        <Typography variant="h5">{user.username}&apos;s Tasks</Typography>
      </Stack>
      <TaskSection tasksArray={tasks} />
      <Stack mt={4}>
        <Typography variant="h5">{user.username}&apos;s Teams</Typography>
      </Stack>
      <Stack>
        <TeamList teams={teams} />
      </Stack>
    </Container>
  );
};

export default UserPage;
