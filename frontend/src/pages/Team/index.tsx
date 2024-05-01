import React, { useState } from 'react';
import { Container, Typography, Box, Button, Avatar, AvatarGroup } from '@mui/material';
import { useStores } from 'src/hooks';
import ModalInfo from 'src/components/modalInfo';
import { MemberList } from 'src/pages/Team/components/MemberList';
import { AdminList } from 'src/pages/Team/components/AdminList';
import { styles } from 'src/pages/Team/styles';
import { stringAvatar } from 'src/utils/common/stringAvatar';
import ProjectList from 'src/pages/Team/components/ProjectList';
import ModalForm from 'src/components/modalForm';
import CreateProjectForm from 'src/pages/Team/components/CreateProjectForm';
import { CreateProjectDto } from 'src/pages/Team/dto/create-project.dto';
import { useParams } from 'react-router-dom';

const TeamPage: React.FC = () => {
  const { teamStore } = useStores();
  const { id } = useParams();
  if (!id) return <></>;
  const team = teamStore.teams.find(team => team.id === parseInt(id))!;

  const [openMembersModal, setOpenMembersModal] = useState(false);
  const [openAdminsModal, setOpenAdminsModal] = useState(false);
  const [openProjectsModal, setOpenProjectsModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenMembersModal = () => setOpenMembersModal(true);
  const handleCloseMembersModal = () => setOpenMembersModal(false);

  const handleOpenAdminsModal = () => setOpenAdminsModal(true);
  const handleCloseAdminsModal = () => setOpenAdminsModal(false);

  const handleOpenProjectsModal = () => setOpenProjectsModal(true);
  const handleCloseProjectsModal = () => setOpenProjectsModal(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleCreateSubmit = (projectDto: CreateProjectDto) => {
    // Perform submission logic here
    console.log('Creating project:', projectDto);
    handleCloseCreateModal();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {team?.name}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>
      <Box sx={styles.controlsBox}>
        <Button variant="outlined" color="primary" onClick={handleOpenCreateModal}>
            Create new Project
        </Button>
        <Button variant="outlined"
          color="primary"
          onClick={handleOpenProjectsModal}>
            View All Projects
        </Button>
      </Box>
      <Box>
        <ProjectList projects={team.projects.slice(0, 5)}/>
      </Box>
      <Box>
        <Box mt={3} sx={styles.textBox}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Members
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleOpenMembersModal}>
            View All
          </Button>
        </Box>
        <Box sx={styles.avatarBox}>
          <AvatarGroup max={10}>
            {team?.members.map(member => (
              <Avatar key={member.id} {...stringAvatar(member.username)} />
            ))}
          </AvatarGroup>
        </Box>
      </Box>
      <Box>
        <Box mt={3} sx={styles.textBox}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Admins
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleOpenAdminsModal}>
            View All
          </Button>
        </Box>
        <Box sx={styles.avatarBox}>
          <AvatarGroup max={10}>
            {team?.admins.map(admin => (
              <Avatar key={admin.id} {...stringAvatar(admin.username)} />
            ))}
          </AvatarGroup>
        </Box>
      </Box>
      <ModalInfo open={openMembersModal} handleClose={handleCloseMembersModal} title="Team Members">
        <MemberList members={team.members}/>
      </ModalInfo>
      <ModalInfo open={openAdminsModal} handleClose={handleCloseAdminsModal} title="Team Admins">
        <AdminList  admins={team.admins}/>
      </ModalInfo>
      <ModalInfo
        open={openProjectsModal}
        handleClose={handleCloseProjectsModal}
        title="Team projects">
        <ProjectList projects={team.projects} />
      </ModalInfo>
      <ModalForm open={openCreateModal} handleClose={handleCloseCreateModal}>
        <CreateProjectForm  onSubmit={handleCreateSubmit} onClose={handleCloseCreateModal}/>
      </ModalForm>
    </Container>
  );
};

export default TeamPage;
