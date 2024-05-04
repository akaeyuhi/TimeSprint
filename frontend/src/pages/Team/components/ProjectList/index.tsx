import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Project } from 'src/models/project.model';
import ProjectItem from '../ProjectItem';

interface ProjectListProps {
  projects: Project[];
  onDelete: (project: Project) => void
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDelete }) => (
  <>
    {(projects.length !== 0) ? <Grid container spacing={2} mt={1}>
      {projects.map(project => (
        <Grid item key={project.id} xs={12}>
          <ProjectItem project={project} onDelete={onDelete}/>
        </Grid>
      ))}
    </Grid> :
      <Typography variant="h5" mt={2}>There is no projects yet.</Typography>}
  </>

);

export default ProjectList;
