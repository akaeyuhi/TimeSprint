import React from 'react';
import { Grid } from '@mui/material';
import { Project } from 'src/models/project.model';
import ProjectItem from '../ProjectItem';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => (
  <Grid container spacing={2} mt={1}>
    {projects.map(project => (
      <Grid item key={project.id} xs={12}>
        <ProjectItem project={project} />
      </Grid>
    ))}
  </Grid>
);

export default ProjectList;
