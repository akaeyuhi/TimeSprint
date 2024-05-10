import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import ModalForm from 'src/components/modalForm';
import { useParams } from 'react-router-dom';
import { useModals } from 'src/hooks/use-modals';
import { UpdateProjectDto } from 'src/dto/project/update-project.dto';
import TaskSection from 'src/components/task/components/TaskSection';
import { toast } from 'react-toastify';
import ProjectProgressBar from 'src/pages/Project/components/ProjectProgressBar';
import EditProjectForm from 'src/pages/Project/components/EditForm';
import Loader from 'src/components/loader';
import { observer } from 'mobx-react';

interface ProjectModals {
  edit: boolean,
}


const ProjectPage = () => {
  const { projectStore } = useStores(); // Assuming you have a MobX store for projects
  const { id } = useParams();
  const [projectModals, setProjectModals] = useState<ProjectModals>({
    edit: false,
  });
  const modalHandlers = useModals<ProjectModals>(projectModals, setProjectModals);

  useEffect(() => {
    projectStore.fetch(Number(id));
  }, []);

  const handleEditSubmit = useCallback(async (updateProjectDto: UpdateProjectDto) => {
    try {
      await projectStore.editProject(updateProjectDto);
      modalHandlers.edit.close();
      toast.success('Edited project!');
    } catch (e) {
      toast.error(`Error occurred: ${projectStore.error}`);
    } finally {
      modalHandlers.edit.close();
    }
  }, []);

  if (projectStore.isLoading) return <Loader />;

  return (
    <Container>
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4">{projectStore.currentProject.name}</Typography>
            <Typography variant="body1" mt={1}>
              {projectStore.currentProject.description}
            </Typography>
            <Typography variant="body2" sx={{ color: 'green' }}>
              Started: {projectStore.currentProject.startDate.toDateString()}
            </Typography>
            <Typography variant="body2" sx={{ color: 'red' }}>
              Due: {projectStore.currentProject.endDate.toDateString()}
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" onClick={modalHandlers.edit.open}>Edit</Button>
          </Box>
        </Box>
        <ModalForm open={projectModals.edit} handleClose={modalHandlers.edit.close}>
          <EditProjectForm
            project={projectStore.currentProject}
            onSubmit={handleEditSubmit}
            onCancel={modalHandlers.edit.close}
          />
        </ModalForm>
      </Stack>
      <ProjectProgressBar tasks={projectStore.currentProject.tasks} />
      <Typography variant="h5" gutterBottom mt={1}>
        Tasks
      </Typography>
      <TaskSection
        members={projectStore.currentProject.team?.members}
        tasksArray={projectStore.currentProject.tasks}
      />
    </Container>
  );
};

export default observer(ProjectPage);
