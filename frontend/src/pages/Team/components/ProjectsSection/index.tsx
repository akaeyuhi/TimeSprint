import React from 'react';
import { ModalHandler } from 'src/hooks/use-modals';
import { Team } from 'src/models/team.model';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import ModalInfo from 'src/components/modalInfo';
import ProjectList from 'src/components/project/ProjectList';
import { Project } from 'src/models/project.model';

interface ProjectsSectionProps {
  createProject: ModalHandler;
  projects: ModalHandler;
  team: Team;
  handleDeleteClick: (project: Project) => void;
  isAdmin?: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  createProject,
  projects,
  team,
  handleDeleteClick,
  isAdmin = false,
}) => (
  <>
    <Stack mt={2}>
      <Box sx={styles.controlsBox}>
        <Typography variant="h4" gutterBottom>
          Projects
        </Typography>
        <Box>
          {isAdmin && (
            <Button
              variant="outlined"
              color="primary"
              sx={{ mr: '1rem' }}
              onClick={createProject.open}
            >
              Create new Project
            </Button>
          )}
          {team && team?.projects?.length ? (
            <Button variant="outlined" color="primary" onClick={projects.open}>
              View All Projects
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Stack>
        <ProjectList
          isAdmin={isAdmin}
          projects={team?.projects?.slice(0, 2)}
          onDelete={handleDeleteClick}
        />
      </Stack>
      <ModalInfo
        open={projects.isOpen}
        handleClose={projects.close}
        title="Team projects"
      >
        <ProjectList
          isAdmin={isAdmin}
          projects={team?.projects}
          onDelete={handleDeleteClick}
        />
      </ModalInfo>
    </Stack>
  </>
);

export default ProjectsSection;
