import React, { useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import EditForm from 'src/pages/Project/components/EditForm';
import ModalForm from 'src/components/modalForm';
import { useParams } from 'react-router-dom';
import { useModals } from 'src/hooks/use-modals';
import { UpdateProjectDto } from 'src/dto/project/update-project.dto';
import TaskSection from 'src/pages/Project/components/TaskSection';

interface ProjectModals {
  edit: boolean,
  tasks: boolean,
  createTask: boolean,
  editTask: boolean,
}


const ProjectPage = () => {
  const { projectStore } = useStores(); // Assuming you have a MobX store for projects
  const { id } = useParams();
  if (!id) return <></>;
  const project = projectStore.projects.find(project => project.id === parseInt(id))!;
  const [projectModals, setProjectModals] = useState<ProjectModals>({
    edit: false,
    tasks: false,
    createTask: false,
    editTask: false,
  });
  const modalHandlers = useModals<ProjectModals>(projectModals, setProjectModals);

  const handleEditSubmit = (updateProjectDto: UpdateProjectDto) => {
    Object.assign(project, updateProjectDto);
  };

  return (
    <Container>
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4">{project.name}</Typography>
            <Typography variant="body1" mt={1}>{project.description}</Typography>
            <Typography variant="body2" sx={{ color: 'red' }}>
              Due: {project.endDate.toDateString()}
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" onClick={modalHandlers.edit.open}>Edit</Button>
          </Box>
        </Box>
        <ModalForm open={projectModals.edit} handleClose={modalHandlers.edit.close}>
          <EditForm
            project={project}
            onSubmit={handleEditSubmit}
            onCancel={modalHandlers.edit.close}
          />
        </ModalForm>
      </Stack>
      <TaskSection
        allTasksModal={projectModals.tasks}
        createModal={projectModals.createTask}
        editModal={projectModals.editTask}
        createTask={modalHandlers.createTask}
        editTask={modalHandlers.editTask}
        tasks={modalHandlers.tasks}
        project={project}/>
      {/* Filter and sort options for tasks */}
    </Container>
  );
};

export default ProjectPage;
