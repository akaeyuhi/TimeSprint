import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useStores } from 'src/hooks';
import ModalForm from 'src/components/modalForm';
import { useParams } from 'react-router-dom';
import { useModals } from 'src/hooks/use-modals';
import TaskSection from 'src/components/task/TaskSection';
import { toast } from 'react-toastify';
import ProjectProgressBar from 'src/components/project/ProjectProgressBar';
import ProjectForm from 'src/components/project/ProjectForm';
import Loader from 'src/components/loader';
import { observer } from 'mobx-react';
import { isObjectEmpty } from 'src/utils/common/isObjectEmpty';
import { ProjectDto } from 'src/services/dto/project.dto';

interface ProjectModals {
  edit: boolean;
}

const ProjectPage = () => {
  const { projectStore, authStore, handler } = useStores();
  const { id } = useParams();
  const [projectModals, setProjectModals] = useState<ProjectModals>({
    edit: false,
  });
  const [isCurrentAdmin, setIsCurrentAdmin] = useState(false);

  const modalHandlers = useModals<ProjectModals>(
    projectModals,
    setProjectModals
  );

  useEffect(() => {
    if (
      id &&
      (isObjectEmpty(projectStore.current) || id !== projectStore.current.id)
    ) {
      projectStore.fetch(id).then(() => {
        setIsCurrentAdmin(projectStore.isUserAdmin(authStore.auth.user.id));
      });
    }
  }, [authStore.auth.user.id, id, projectStore]);

  const handleEditSubmit = useCallback(
    async (updateProjectDto: ProjectDto) => {
      await projectStore.editProject(updateProjectDto);
      if (!projectStore.error && !projectStore.isLoading) {
        modalHandlers.edit.close();
        toast.success(`Edited project!`);
      }
    },
    [modalHandlers.edit, projectStore]
  );

  if (projectStore.isLoading || isObjectEmpty(projectStore.current))
    return <Loader />;
  if (projectStore.error) handler.handle(projectStore.error.message);

  return (
    <Container>
      <Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
            {isCurrentAdmin && (
              <Button variant="outlined" onClick={modalHandlers.edit.open}>
                Edit
              </Button>
            )}
          </Box>
        </Box>
        <ModalForm
          open={projectModals.edit}
          handleClose={modalHandlers.edit.close}
        >
          <ProjectForm
            project={projectStore.current}
            onSubmit={handleEditSubmit}
            onCancel={modalHandlers.edit.close}
            isEdited={true}
          />
        </ModalForm>
      </Stack>
      <ProjectProgressBar progress={projectStore.progress} />
      <TaskSection isProjectPage isAdmin={isCurrentAdmin} projectId={id} />
    </Container>
  );
};
export default observer(ProjectPage);
