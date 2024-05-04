import React, { useState } from 'react';
import { Container, Typography, Box, Button, Avatar, AvatarGroup, Stack } from '@mui/material';
import { useStores } from 'src/hooks';
import ModalInfo from 'src/components/modalInfo';
import { MemberList } from 'src/pages/Team/components/MemberList';
import { styles } from 'src/pages/Team/styles';
import { stringAvatar } from 'src/utils/common/stringAvatar';
import ProjectList from 'src/pages/Team/components/ProjectList';
import ModalForm from 'src/components/modalForm';
import CreateProjectForm from 'src/pages/Team/components/CreateProjectForm';
import { CreateProjectDto } from 'src/pages/Team/dto/create-project.dto';
import { useNavigate, useParams } from 'react-router-dom';
import AddUserForm from 'src/pages/Team/components/AddUserForm';
import AddAdminForm from 'src/pages/Team/components/AddAdminForm';
import { User } from 'src/models/user.model';
import DeleteProjectForm from 'src/pages/Team/components/DeleteProjectForm';
import { Project } from 'src/models/project.model';
import LeaveTeamForm from 'src/pages/Team/components/LeaveTeamForm';
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

interface ModalsHandler {
  isOpen: boolean,
  open: () => void,
  close: () => void;
}


const TeamPage: React.FC = () => {
  const { teamStore } = useStores();
  const { id } = useParams();
  if (!id) return <></>;
  const team = teamStore.teams.find(team => team.id === parseInt(id))!;
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);

  const [teamModals, setTeamModals] = useState<TeamModals>({
    members: false,
    admins: false,
    projects: false,
    createProject: false,
    deleteProject: false,
    addUser: false,
    addAdmin: false,
    leaveTeam: false
  });

  const getModalHandler = (modalName: keyof TeamModals): ModalsHandler => ({
    isOpen: teamModals[modalName],
    open: () => setTeamModals((state) => ({ ...state, [modalName]: true })),
    close: () => setTeamModals((state) => ({ ...state, [modalName]: false })),
  });
  const handleMembersModal = getModalHandler('members');
  const handleAdminsModal = getModalHandler('admins');
  const handleProjectsModal = getModalHandler('projects');
  const handleCreateModal = getModalHandler('createProject');
  const handleDeleteModal = getModalHandler('deleteProject');
  const handleAddUserModal = getModalHandler('addUser');
  const handleAddAdminModal = getModalHandler('addAdmin');
  const handleLeaveModal = getModalHandler('leaveTeam');

  const handleCreateSubmit = (projectDto: CreateProjectDto) => {
    // Perform submission logic here
    console.log('Creating project:', projectDto);
    handleCreateModal.close();
  };

  const handleAddUserSubmit = (username: string) => {
    // Perform submission logic here
    console.log('Adding user:', username);
    handleAddUserModal.close();
  };

  const handleAddAdminSubmit = (user: User) => {
    // Perform submission logic here
    console.log('Adding user:', user);
    handleAddAdminModal.close();
  };

  const handleDeleteProject = () => {
    if (deleteProject) {
      team.projects = team.projects.filter(project => project.id !== deleteProject.id);
    }
    handleDeleteModal.close();
    setDeleteProject(null);
  };

  const handleDeleteClick = (project: Project) => {
    setDeleteProject(project);
    handleDeleteModal.open();
  };

  const handleLeaveTeam = () => {
    // some logic to actually leave;
    console.log('Leaving team', team);
    useNavigate()('/teams');
  };

  return (
    <Container>
      <Box sx={styles.controlsBox}>
        <Typography variant="h4" gutterBottom>
          {team?.name}
        </Typography>
        <Button variant="contained" color="error" onClick={handleLeaveModal.open}>
          Leave
        </Button>
      </Box>
      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>
      <Box sx={styles.controlsBox}>
        <Button variant="outlined" color="primary" onClick={handleCreateModal.open}>
            Create new Project
        </Button>
        {team.projects.length ? <Button variant="outlined"
          color="primary"
          onClick={handleProjectsModal.open}>
          View All Projects
        </Button> : <></>}
      </Box>
      <Stack>
        <ProjectList projects={team.projects.slice(0, 5)} onDelete={handleDeleteClick}/>
      </Stack>
      <Stack>
        <Box mt={3} sx={styles.textBox}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Members
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleMembersModal.open}>
            View All
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddUserModal.open}
            sx={{ ml: '0.5rem' }}
          >
            Add new member
          </Button>
        </Box>
        <Box sx={styles.avatarBox}>
          <AvatarGroup max={10}>
            {team?.members.map(member => (
              <Avatar key={member.id} {...stringAvatar(member.username)} />
            ))}
          </AvatarGroup>
        </Box>
      </Stack>
      <Stack>
        <Box mt={3} sx={styles.textBox}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Admins
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleAdminsModal.open}>
            View All
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddAdminModal.open}
            sx={{ ml: '0.5rem' }}
          >
            Add new admin
          </Button>
        </Box>
        <Box sx={styles.avatarBox}>
          <AvatarGroup max={10}>
            {team?.admins.map(admin => (
              <Avatar key={admin.id} {...stringAvatar(admin.username)} />
            ))}
          </AvatarGroup>
        </Box>
      </Stack>
      <ModalInfo
        open={teamModals.members}
        handleClose={handleMembersModal.close}
        title="Team Members">
        <MemberList members={team.members}/>
      </ModalInfo>
      <ModalInfo
        open={teamModals.admins}
        handleClose={handleAdminsModal.close}
        title="Team Admins">
        <MemberList  members={team.admins}/>
      </ModalInfo>
      <ModalInfo
        open={teamModals.projects}
        handleClose={handleProjectsModal.close}
        title="Team projects">
        <ProjectList projects={team.projects} onDelete={handleDeleteClick}/>
      </ModalInfo>
      <ModalForm open={teamModals.createProject} handleClose={handleCreateModal.close}>
        <CreateProjectForm  onSubmit={handleCreateSubmit} onClose={handleCreateModal.close}/>
      </ModalForm>
      <ModalForm handleClose={handleDeleteModal.close} open={teamModals.deleteProject}>
        <DeleteProjectForm
          project={deleteProject}
          onClose={handleDeleteModal.close}
          onDelete={handleDeleteProject}/>
      </ModalForm>
      <ModalForm handleClose={handleAddUserModal.close} open={teamModals.addUser}>
        <AddUserForm  onClose={handleAddUserModal.close} onSubmit={handleAddUserSubmit}/>
      </ModalForm>
      <ModalForm handleClose={handleAddAdminModal.close} open={teamModals.addAdmin}>
        <AddAdminForm
          onClose={handleAddAdminModal.close}
          onSubmit={handleAddAdminSubmit}
          candidates={team.members}/>
      </ModalForm>
      <ModalForm handleClose={handleLeaveModal.close} open={teamModals.leaveTeam}>
        <LeaveTeamForm onClose={handleLeaveModal.close} team={team} onLeave={handleLeaveTeam}/>
      </ModalForm>
    </Container>
  );
};

export default TeamPage;
