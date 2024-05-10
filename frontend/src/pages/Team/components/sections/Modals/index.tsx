import React from 'react';
import ModalForm from 'src/components/modalForm';
import CreateProjectForm from 'src/pages/Team/components/forms/CreateProjectForm';
import DeleteProjectForm from 'src/pages/Team/components/forms/DeleteProjectForm';
import AddUserForm from 'src/pages/Team/components/forms/AddUserForm';
import AddAdminForm from 'src/pages/Team/components/forms/AddAdminForm';
import LeaveTeamForm from 'src/pages/Team/components/forms/LeaveTeamForm';
import { ModalHandler } from 'src/hooks/use-modals';
import { Project } from 'src/models/project.model';
import { Team } from 'src/models/team.model';
import { User } from 'src/models/user.model';
import { CreateProjectDto } from 'src/dto/project/create-project.dto';

interface ModalsProps {
  createProject: ModalHandler,
  deleteProject: ModalHandler,
  addUser: ModalHandler,
  addAdmin: ModalHandler,
  leaveTeam: ModalHandler,
  deletedProject: Project | null,
  team: Team,
  handleCreateSubmit: (createProjectDto: CreateProjectDto) => void,
  handleAddUserSubmit: (username: string) => void,
  handleAddAdminSubmit: (user: User) => void,
  handleDeleteProject: (projectId: number) => Promise<void>,
  handleLeaveTeam: () => void,
}


const Modals: React.FC<ModalsProps> = ({
  createProject,
  deleteProject,
  addUser,
  addAdmin,
  leaveTeam,
  deletedProject,
  team,
  handleCreateSubmit,
  handleAddUserSubmit,
  handleAddAdminSubmit,
  handleDeleteProject,
  handleLeaveTeam,
}) => (
  <>
    <ModalForm open={createProject.isOpen} handleClose={createProject.close}>
      <CreateProjectForm onSubmit={handleCreateSubmit} onClose={createProject.close} />
    </ModalForm>
    <ModalForm handleClose={deleteProject.close} open={deleteProject.isOpen}>
      <DeleteProjectForm
        project={deletedProject}
        onClose={deleteProject.close}
        onDelete={handleDeleteProject} />
    </ModalForm>
    <ModalForm handleClose={addUser.close} open={addUser.isOpen}>
      <AddUserForm onClose={addUser.close} onSubmit={handleAddUserSubmit} />
    </ModalForm>
    <ModalForm handleClose={addAdmin.close} open={addAdmin.isOpen}>
      <AddAdminForm
        onClose={addAdmin.close}
        onSubmit={handleAddAdminSubmit}
        candidates={team.members} />
    </ModalForm>
    <ModalForm handleClose={leaveTeam.close} open={leaveTeam.isOpen}>
      <LeaveTeamForm onClose={leaveTeam.close} team={team} onLeave={handleLeaveTeam} />
    </ModalForm>
  </>
);

export default Modals;
