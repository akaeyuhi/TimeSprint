import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useStores } from 'src/hooks';
import { styles } from 'src/pages/Team/styles';
import { CreateProjectDto } from 'src/pages/Team/dto/create-project.dto';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from 'src/models/user.model';
import { Project } from 'src/models/project.model';
import Modals from 'src/pages/Team/components/sections/Modals';
import MembersSection from 'src/pages/Team/components/sections/MembersSection';
import ProjectsSection from 'src/pages/Team/components/sections/ProjectsSection';
import { useModals } from 'src/hooks/use-modals';
export interface TeamModals {
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
    leaveTeam: false
  });
  const { teamStore } = useStores();
  const modalHandlers = useModals<TeamModals>(teamModals, setTeamModals);
  const { id } = useParams();
  if (!id) return <></>;
  const team = teamStore.teams.find(team => team.id === parseInt(id))!;
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);

  const handleCreateSubmit = (projectDto: CreateProjectDto) => {
    // Perform submission logic here
    console.log('Creating project:', projectDto);
    modalHandlers.createProject?.close();
  };

  const handleAddUserSubmit = (username: string) => {
    // Perform submission logic here
    console.log('Adding user:', username);
    modalHandlers.addUser?.close();
  };

  const handleAddAdminSubmit = (user: User) => {
    // Perform submission logic here
    console.log('Adding user:', user);
    modalHandlers.addAdmin?.close();
  };

  const handleDeleteProject = () => {
    if (deleteProject) {
      team.projects = team.projects.filter(project => project.id !== deleteProject.id);
    }
    modalHandlers.deleteProject?.close();
    setDeleteProject(null);
  };

  const handleDeleteClick = (project: Project) => {
    setDeleteProject(project);
    modalHandlers.deleteProject?.open();
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
        <Button variant="contained" color="error" onClick={modalHandlers.deleteProject.open}>
          Leave
        </Button>
      </Box>
      <ProjectsSection
        team={team}
        teamModals={teamModals}
        handleDeleteClick={handleDeleteClick}
        {...modalHandlers}/>
      <MembersSection team={team} teamModals={teamModals} {...modalHandlers}/>
      <Modals
        handleCreateSubmit={handleCreateSubmit}
        handleAddUserSubmit={handleAddUserSubmit}
        handleAddAdminSubmit={handleAddAdminSubmit}
        handleDeleteProject={handleDeleteProject}
        handleLeaveTeam={handleLeaveTeam}
        teamModals={teamModals}
        team={team}
        deletedProject={deleteProject}
        {...modalHandlers}/>
    </Container>
  );
};

export default TeamPage;
