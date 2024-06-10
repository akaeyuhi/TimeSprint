import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import { styles } from 'src/pages/Team/styles';
import { CreateProjectDto } from 'src/services/dto/project/create-project.dto';
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
import { isObjectEmpty } from 'src/utils/common/isObjectEmpty';

interface TeamModals {
  members: boolean,
  admins: boolean,
  projects: boolean,
  createProject: boolean,
  deleteProject: boolean,
  addUser: boolean,
  addAdmin: boolean,
  deleteUser: false,
  deleteAdmin: false,
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
    deleteUser: false,
    deleteAdmin: false,
    leaveTeam: false,
  });
  const { authStore, userStore, teamStore, handler } = useStores();
  const modalHandlers = useModals<TeamModals>(teamModals, setTeamModals);
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isCurrentAdmin, setIsCurrentAdmin] = useState(false);

  useEffect(() => {
    teamStore.fetch(Number(id)).then(() => {
      const currentUser = teamStore.getUserById(authStore.auth.user.id);
      if (!currentUser) {
        handler.handle('Something went wrong');
        return;
      }
      setIsCurrentAdmin(teamStore.isAdmin(currentUser));
    });
  }, [authStore.auth.user.id, handler, id, teamStore]);

  const handleCreateSubmit = useCallback(async (projectDto: CreateProjectDto) => {
    try {
      await teamStore.createProject(projectDto);
      toast.success(`Created project ${projectDto.name}!`);
    } catch (e) {
      handler.handle(`Error occurred: ${teamStore.error}!`);
    } finally {
      modalHandlers.createProject.close();
    }
  }, [handler, modalHandlers.createProject, teamStore]);

  const handleAddUserSubmit = useCallback(async (user: User) => {
    try {
      await teamStore.addMember(user);
      toast.success(`Added new member! ${user.username}!`);
    } catch (e) {
      handler.handle(`Error occurred: ${teamStore.error ?? userStore.error}!`);
    } finally {
      modalHandlers.addUser.close();
    }
  }, [handler, modalHandlers.addUser, teamStore, userStore.error]);

  const handleAddAdminSubmit = useCallback(async (user: User) => {
    try {
      await teamStore.addAdmin(user);
      toast.success(`Added new admin! ${user.username}!`);
    } catch (e) {
      handler.handle(`Error occurred: ${teamStore.error}!`);
    } finally {
      modalHandlers.addAdmin.close();
    }
  }, [handler, modalHandlers.addAdmin, teamStore]);

  const handleDeleteProject = useCallback(async (projectId: number) => {
    try {
      await teamStore.deleteProject(projectId);
      toast.success(`Deleted project!`);
    } catch (e) {
      handler.handle(`Error occurred: ${teamStore.error}!`);
    } finally {
      modalHandlers.deleteProject.close();
    }
  }, [handler, modalHandlers.deleteProject, teamStore]);

  const handleLeaveTeam = useCallback(async () => {
    try {
      const userId = authStore.auth.user.id;
      await userStore.fetch(userId);
      await userStore.leaveTeam(teamStore.current.id);
      navigate('/teams');
      toast.success(`Left team ${teamStore.current}`);
    } catch (e) {
      handler.handle(`Error occurred: ${teamStore.error}!`);
    } finally {
      modalHandlers.leaveTeam.close();
    }
  }, [
    authStore.auth.user.id,
    handler,
    modalHandlers.leaveTeam,
    navigate,
    teamStore.current,
    teamStore.error,
    userStore
  ]);

  const handleDeleteUser = useCallback(async (userId: number) => {
    try {
      await teamStore.deleteUser(userId);
      toast.success(`Deleted user!`);
    } catch (e) {
      handler.handle(`Error occurred: ${teamStore.error}!`);
    } finally {
      modalHandlers.deleteUser.close();
      setDeleteUser(null);
    }
  }, [handler, modalHandlers.deleteUser, teamStore]);

  const handleDeleteAdmin = useCallback(async (userId: number) => {
    try {
      await teamStore.deleteAdmin(userId);
      toast.success(`Deleted admin!`);
    } catch (e) {
      handler.handle(`Error occurred: ${teamStore.error}!`);
    } finally {
      modalHandlers.deleteAdmin.close();
      setDeleteUser(null);
    }
  }, [handler, modalHandlers.deleteAdmin, teamStore]);

  const handleDeleteClick = (project: Project) => {
    setDeleteProject(project);
    modalHandlers.deleteProject.open();
  };

  const handleDeleteUserClick = (user: User) => {
    setDeleteUser(user);
    modalHandlers.deleteUser.open();
  };

  const handleDeleteAdminClick = (user: User) => {
    setDeleteUser(user);
    modalHandlers.deleteAdmin.open();
  };

  if (teamStore.isLoading || userStore.isLoading || isObjectEmpty(teamStore.current))
    return <Container><Loader /></Container>;
  if (teamStore.error) handler.handle(teamStore.error.message);
  if (userStore.error) handler.handle(userStore.error.message);

  return (
    <Container>
      <Box sx={styles.controlsBox}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {teamStore.current.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {teamStore.current.description}
          </Typography>
        </Box>
        <Button variant="contained" color="error" onClick={modalHandlers.leaveTeam.open}>
          Leave
        </Button>
      </Box>
      <ProjectsSection
        team={teamStore.current}
        handleDeleteClick={handleDeleteClick}
        isAdmin={isCurrentAdmin}
        {...modalHandlers}
      />
      <MembersSection
        team={teamStore.current}
        onDeleteUser={handleDeleteUserClick}
        onDeleteAdmin={handleDeleteAdminClick}
        isAdmin={isCurrentAdmin}
        {...modalHandlers}
      />
      <Modals
        handleDeleteUser={handleDeleteUser}
        handleDeleteAdmin={handleDeleteAdmin}
        handleCreateSubmit={handleCreateSubmit}
        handleAddUserSubmit={handleAddUserSubmit}
        handleAddAdminSubmit={handleAddAdminSubmit}
        handleDeleteProject={handleDeleteProject}
        handleLeaveTeam={handleLeaveTeam}
        team={teamStore.current}
        deletedProject={deleteProject}
        deletedUser={deleteUser}
        {...modalHandlers} />
    </Container>
  );
};

export default observer(TeamPage);
