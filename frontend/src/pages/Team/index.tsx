import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import { styles } from 'src/pages/Team/styles';
import { CreateProjectDto } from 'src/dto/project/create-project.dto';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from 'src/models/user.model';
import { Project } from 'src/models/project.model';
import Modals from 'src/pages/Team/components/sections/Modals';
import MembersSection from 'src/pages/Team/components/sections/MembersSection';
import ProjectsSection from 'src/pages/Team/components/sections/ProjectsSection';
import { useModals } from 'src/hooks/use-modals';
import Loader from 'src/components/loader';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

interface TeamModals {
  members: boolean,
  admins: boolean,
  projects: boolean,
  createProject: boolean,
  deleteProject: boolean,
  addUser: boolean,
  addAdmin: boolean,
  leaveTeam: boolean,
}


const TeamPage: React.FC = () => {
  const [teamModals, setTeamModals] = useState<TeamModals>({
    members: false,
    admins: false,
    projects: false,
    createProject: false,
    deleteProject: false,
    addUser: false,
    addAdmin: false,
    leaveTeam: false,
  });
  const { authStore, userStore, teamStore } = useStores();
  const modalHandlers = useModals<TeamModals>(teamModals, setTeamModals);
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);

  useEffect(() => {
    teamStore.fetch(Number(id));
  }, []);

  const handleCreateSubmit = useCallback(async (projectDto: CreateProjectDto) => {
    try {
      await teamStore.createProject(projectDto);
      toast.success(`Created project ${projectDto.name}!`);
    } catch (e) {
      toast.error(`Error occurred: ${teamStore.error}!`);
    } finally {
      modalHandlers.createProject.close();
    }
  }, [teamStore]);

  const handleAddUserSubmit = useCallback(async (username: string) => {
    try {
      await userStore.fetchByUsername(username);
      await teamStore.addMember(userStore.currentUser);
      toast.success(`Added new member! ${username}!`);
    } catch (e) {
      toast.error(`Error occurred: ${teamStore.error ?? userStore.error}!`);
    } finally {
      modalHandlers.addUser.close();
    }
  }, [teamStore, userStore]);

  const handleAddAdminSubmit = useCallback(async (user: User) => {
    try {
      await teamStore.addAdmin(user);
      toast.success(`Added new admin! ${user.username}!`);
    } catch (e) {
      toast.error(`Error occurred: ${teamStore.error}!`);
    } finally {
      modalHandlers.addAdmin.close();
    }
  }, [teamStore]);

  const handleDeleteProject = useCallback(async (projectId: number) => {
    try {
      await teamStore.deleteProject(projectId);
      toast.success(`Deleted project!`);
    } catch (e) {
      toast.error(`Error occurred: ${teamStore.error}!`);
    } finally {
      modalHandlers.deleteProject.close();
    }
  }, [teamStore]);

  const handleLeaveTeam = useCallback(async () => {
    try {
      const userId = authStore.auth.user.id;
      await userStore.fetch(userId);
      await userStore.leaveTeam(teamStore.currentTeam.id);
      navigate('/teams');
      toast.success(`Left team ${teamStore.currentTeam}`);
    } catch (e) {
      toast.error(`Error occurred: ${teamStore.error}!`);
    } finally {
      modalHandlers.leaveTeam.close();
    }
  }, [userStore]);

  const handleDeleteClick = (project: Project) => {
    setDeleteProject(project);
    modalHandlers.deleteProject.open();
  };

  if (teamStore.isLoading) return <Loader />;

  return (
    <Container>
      <Box sx={styles.controlsBox}>
        <Typography variant="h4" gutterBottom>
          {teamStore.currentTeam.name}
        </Typography>
        <Button variant="contained" color="error" onClick={modalHandlers.leaveTeam.open}>
          Leave
        </Button>
      </Box>
      <ProjectsSection
        team={teamStore.currentTeam}
        handleDeleteClick={handleDeleteClick}
        {...modalHandlers} />
      <MembersSection team={teamStore.currentTeam} {...modalHandlers} />
      <Modals
        handleCreateSubmit={handleCreateSubmit}
        handleAddUserSubmit={handleAddUserSubmit}
        handleAddAdminSubmit={handleAddAdminSubmit}
        handleDeleteProject={handleDeleteProject}
        handleLeaveTeam={handleLeaveTeam}
        team={teamStore.currentTeam}
        deletedProject={deleteProject}
        {...modalHandlers} />
    </Container>
  );
};

export default observer(TeamPage);
