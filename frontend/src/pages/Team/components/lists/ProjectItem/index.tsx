import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/components/lists/ProjectItem/styles';
import { Project } from 'src/models/project.model';
import { Link } from 'react-router-dom';

interface ProjectItemProps {
  project: Project;
  isAdmin?: boolean;
  onDelete: (project: Project) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onDelete, isAdmin = false }) => (
  <Card sx={{ ...styles.card, opacity: project.isCompleted ? 0.7 : 1 }} variant="outlined">
    <CardContent>
      <Typography variant="h6">{project.name}</Typography>
      <Typography variant="body1">{project.description}</Typography>
      <Typography variant="body1">Tasks: {project.tasks.length}</Typography>
    </CardContent>
    <CardActions>
      <Link to={`./projects/${project.id}`} relative="path">
        <Button variant="contained" color="primary" sx={{ mt: 1 }}>
          Go to Project Page
        </Button>
      </Link>
      {isAdmin &&
        <Button variant="contained" color="error" sx={{ mt: 1 }} onClick={() => onDelete(project)}>
        Delete project
        </Button>}
    </CardActions>

  </Card>
);

export default ProjectItem;
