import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Project } from 'src/models/project.model';
import ProjectItem from 'src/pages/Team/components/lists/ProjectItem';

interface ProjectListProps {
  projects: Project[];
  onDelete: (project: Project) => void;
  isAdmin?: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDelete, isAdmin = false }) => (
  <>
    {(projects.length !== 0) ? <Grid container spacing={2} mt={1}>
      {projects.map(project => (
        <Grid item key={project.id} xs={12}>
          <ProjectItem project={project} onDelete={onDelete} isAdmin={isAdmin} />
        </Grid>
      ))}
    </Grid> :
      <Typography variant="h5" mt={2}>There is no projects yet.</Typography>}
  </>

);

export default ProjectList;
