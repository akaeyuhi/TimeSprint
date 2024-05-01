import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { styles } from './styles';
import { Project } from 'src/models/project.model';
import { Link } from 'react-router-dom';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => (
  <Card sx={{ ...styles.card, opacity: project.isCompleted ? 0.7 : 1 }} variant="outlined">
    <CardContent>
      <Typography variant="h6">{project.name}</Typography>
      <Typography variant="body1">{project.description}</Typography>
      <Typography variant="body1">Tasks: {project.tasks.length}</Typography>
    </CardContent>
    <Link to={`./projects/${project.id}`} relative="path">
      <Button variant="contained" color="primary" sx={{ mt: 1 }}>
        Go to Project Page
      </Button>
    </Link>
  </Card>
);

export default ProjectItem;
