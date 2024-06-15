import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { styles } from 'src/components/project/ProjectItem/styles';
import { Project } from 'src/models/project.model';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

interface ProjectItemProps {
  item: Project;
  isAdmin?: boolean;
  onDelete: (project: Project) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  item: project,
  onDelete,
  isAdmin = false,
}) => (
  <Grid item xs={12}>
    <Card
      sx={{ ...styles.card, opacity: project.isCompleted ? 0.7 : 1 }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h6">{project.name}</Typography>
        <Typography variant="body1">{project.description}</Typography>
        <Typography variant="body1" sx={{ color: 'red' }}>
          Due: {project.endDate.toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`./projects/${project.id}`} relative="path">
          <Button variant="contained" color="primary" sx={{ mt: 1 }}>
            Go to Project Page
          </Button>
        </Link>
        {isAdmin && (
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 1 }}
            onClick={() => onDelete(project)}
          >
            Delete project
          </Button>
        )}
      </CardActions>
    </Card>
  </Grid>
);

export default observer(ProjectItem);
