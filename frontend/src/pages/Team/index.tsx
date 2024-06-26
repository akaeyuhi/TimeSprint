import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import { styles } from 'src/pages/Team/styles';
import { ProjectDto } from 'src/services/dto/project.dto';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from 'src/models/user.model';
import { Project } from 'src/models/project.model';
import Modals from 'src/pages/Team/components/Modals';
import MembersSection from 'src/pages/Team/components/MembersSection';
import ProjectsSection from 'src/pages/Team/components/ProjectsSection';
import { useModals } from 'src/hooks/use-modals';
import Loader from 'src/components/loader';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { isObjectEmpty } from 'src/utils/common/isObjectEmpty';

interface TeamModals {
  members: boolean;
  admins: boolean;
  projects: boolean;
  createProject: boolean;
  deleteProject: boolean;
  addUser: boolean;
  addAdmin: boolean;
  deleteUser: false;
  deleteAdmin: false;
  leaveTeam: boolean;
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
  const [isCurrentAdmin, setIsCurrentAdmin] = useState(
    !isObjectEmpty(teamStore.current)
      ? teamStore.isAdmin(authStore.auth.user.id)
      : false
  );

  useEffect(() => {
    if (isObjectEmpty(teamStore.current) || teamStore.current.id !== id) {
      teamStore
        .fetch(id ?? '')
        .then(() =>
          setIsCurrentAdmin(teamStore.isAdmin(authStore.auth.user.id))
        );
    }
  }, [authStore.auth.user.id, handler, id, teamStore]);

  const handleCreateSubmit = useCallback(
    async (projectDto: ProjectDto) => {
      await teamStore.createProject(projectDto);
      if (!teamStore.error && !teamStore.isLoading) {
        modalHandlers.createProject.close();
        toast.success(`Created project ${projectDto.name}!`);
      }
    },
    [modalHandlers.createProject, teamStore]
  );

  const handleAddUserSubmit = useCallback(
    async (user: User) => {
      await teamStore.addMember(user);
      if (!teamStore.error && !teamStore.isLoading) {
        modalHandlers.addUser.close();
        toast.success(`Added new member! ${user.username}!`);
      }
    },
    [modalHandlers.addUser, teamStore]
  );

  const handleAddAdminSubmit = useCallback(
    async (user: User) => {
      await teamStore.addAdmin(user);
      if (!teamStore.error && !teamStore.isLoading) {
        modalHandlers.addAdmin.close();
        toast.success(`Added new admin! ${user.username}!`);
      }
    },
    [modalHandlers.addAdmin, teamStore]
  );

  const handleDeleteProject = useCallback(
    async (projectId: string) => {
      await teamStore.deleteProject(projectId);
      if (!teamStore.error && !teamStore.isLoading) {
        modalHandlers.deleteProject.close();
        toast.success(`Deleted project!`);
        setDeleteUser(null);
      }
    },
    [modalHandlers.deleteProject, teamStore]
  );

  const handleLeaveTeam = useCallback(async () => {
    const userId = authStore.auth.user.id;
    await userStore.fetch(userId);
    await userStore.leaveTeam(teamStore.current.id);
    if (!teamStore.error && !teamStore.isLoading) {
      modalHandlers.leaveTeam.close();
      navigate('/app/teams');
      toast.success(`Left team ${teamStore.current.name}`);
    }
  }, [
    authStore.auth.user.id,
    modalHandlers.leaveTeam,
    navigate,
    teamStore,
    userStore,
  ]);

  const handleDeleteUser = useCallback(
    async (userId: string) => {
      await teamStore.deleteUser(userId);
      if (!teamStore.error && !teamStore.isLoading) {
        modalHandlers.deleteUser.close();
        toast.success(`Deleted user!`);
        setDeleteUser(null);
      }
    },
    [modalHandlers.deleteUser, teamStore]
  );

  const handleDeleteAdmin = useCallback(
    async (userId: string) => {
      await teamStore.deleteAdmin(userId);
      if (!teamStore.error && !teamStore.isLoading) {
        modalHandlers.deleteAdmin.close();
        toast.success(`Deleted admin!`);
        setDeleteUser(null);
      }
    },
    [modalHandlers.deleteAdmin, teamStore]
  );

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

  if (
    teamStore.isLoading ||
    userStore.isLoading ||
    isObjectEmpty(teamStore.current)
  )
    return <Loader />;
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
        <Button
          variant="contained"
          color="error"
          onClick={modalHandlers.leaveTeam.open}
        >
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
        {...modalHandlers}
      />
    </Container>
  );
};

export default observer(TeamPage);
