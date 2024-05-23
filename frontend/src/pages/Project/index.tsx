import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import ModalForm from 'src/components/modalForm';
import { useParams } from 'react-router-dom';
import { useModals } from 'src/hooks/use-modals';
import { UpdateProjectDto } from 'src/services/dto/project/update-project.dto';
import TaskSection from 'src/components/task/components/TaskSection';
import { toast } from 'react-toastify';
import ProjectProgressBar from 'src/pages/Project/components/ProjectProgressBar';
import EditProjectForm from 'src/pages/Project/components/EditProjectForm';
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
  }, [id, projectStore]);


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
  }, [modalHandlers.edit, projectStore]);

  if (projectStore.isLoading) return <Loader />;

  return (
    <Container>
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4">{projectStore.current.name}</Typography>
            <Typography variant="body1" mt={1}>
              {projectStore.current.description}
            </Typography>
            <Typography variant="body2" sx={{ color: 'green' }}>
              Started: {projectStore.current.startDate.toDateString()}
            </Typography>
            <Typography variant="body2" sx={{ color: 'red' }}>
              Due: {projectStore.current.endDate.toDateString()}
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" onClick={modalHandlers.edit.open}>Edit</Button>
          </Box>
        </Box>
        <ModalForm open={projectModals.edit} handleClose={modalHandlers.edit.close}>
          <EditProjectForm
            project={projectStore.current}
            onSubmit={handleEditSubmit}
            onCancel={modalHandlers.edit.close}
          />
        </ModalForm>
      </Stack>
      <ProjectProgressBar progress={projectStore.progress} />
      <TaskSection isProjectPage isEditable/>
    </Container>
  );
};

export default observer(ProjectPage);
