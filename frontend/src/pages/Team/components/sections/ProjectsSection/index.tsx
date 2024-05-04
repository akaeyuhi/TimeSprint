import React from 'react';
import { ModalHandler } from 'src/utils/common/getModalHandlers';
import { Team } from 'src/models/team.model';
import { TeamModals } from 'src/pages/Team/index';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import ModalInfo from 'src/components/modalInfo';
import ProjectList from 'src/pages/Team/components/lists/ProjectList';
import { Project } from 'src/models/project.model';

interface ProjectsSectionProps {
  createProject: ModalHandler,
  projects: ModalHandler,
  team: Team,
  teamModals: TeamModals,
  handleDeleteClick: (project: Project) => void,
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  createProject,
  projects,
  team,
  teamModals,
  handleDeleteClick
}) => (
  <>
    <Stack>
      <Typography variant="h5" gutterBottom>
          Projects
      </Typography>
      <Box sx={styles.controlsBox}>
        <Button variant="outlined" color="primary" onClick={createProject.open}>
            Create new Project
        </Button>
        {team.projects.length ? <Button variant="outlined"
          color="primary"
          onClick={projects.open}>
            View All Projects
        </Button> : <></>}
      </Box>
      <Stack>
        <ProjectList projects={team.projects.slice(0, 5)} onDelete={handleDeleteClick}/>
      </Stack>
      <ModalInfo
        open={teamModals.projects}
        handleClose={projects.close}
        title="Team projects">
        <ProjectList projects={team.projects} onDelete={handleDeleteClick}/>
      </ModalInfo>
    </Stack>
  </>
);

export default ProjectsSection;