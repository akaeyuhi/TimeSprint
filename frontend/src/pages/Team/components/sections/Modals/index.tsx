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
import { TeamModals } from 'src/pages/Team/index';
import { User } from 'src/models/user.model';
import { CreateProjectDto } from 'src/pages/Team/dto/create-project.dto';

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
  handleDeleteProject: () => void,
  handleLeaveTeam: () => void,
  teamModals: TeamModals,
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
  teamModals
}) => (
  <>
    <ModalForm open={teamModals.createProject} handleClose={createProject.close}>
      <CreateProjectForm onSubmit={handleCreateSubmit} onClose={createProject.close}/>
    </ModalForm>
    <ModalForm handleClose={deleteProject.close} open={teamModals.deleteProject}>
      <DeleteProjectForm
        project={deletedProject}
        onClose={deleteProject.close}
        onDelete={handleDeleteProject}/>
    </ModalForm>
    <ModalForm handleClose={addUser.close} open={teamModals.addUser}>
      <AddUserForm onClose={addUser.close} onSubmit={handleAddUserSubmit}/>
    </ModalForm>
    <ModalForm handleClose={addAdmin.close} open={teamModals.addAdmin}>
      <AddAdminForm
        onClose={addAdmin.close}
        onSubmit={handleAddAdminSubmit}
        candidates={team.members}/>
    </ModalForm>
    <ModalForm handleClose={leaveTeam.close} open={teamModals.leaveTeam}>
      <LeaveTeamForm onClose={leaveTeam.close} team={team} onLeave={handleLeaveTeam}/>
    </ModalForm>
  </>
);

export default Modals;
