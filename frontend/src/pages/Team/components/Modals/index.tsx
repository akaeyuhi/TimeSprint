import React from 'react';
import ModalForm from 'src/components/modalForm';
import DeleteProjectForm from 'src/components/project/DeleteProjectModal';
import AddUserForm from 'src/components/team/AddUserForm';
import AddAdminForm from 'src/components/team/AddAdminForm';
import LeaveTeamForm from 'src/components/team/LeaveTeamForm';
import { ModalHandler } from 'src/hooks/use-modals';
import { Project } from 'src/models/project.model';
import { Team } from 'src/models/team.model';
import { User } from 'src/models/user.model';
import { ProjectDto } from 'src/services/dto/project.dto';
import DeleteUserModal from 'src/components/team/DeleteUserModal';
import ProjectForm from 'src/components/project/ProjectForm';

interface ModalsProps {
  createProject: ModalHandler;
  deleteProject: ModalHandler;
  addUser: ModalHandler;
  addAdmin: ModalHandler;
  leaveTeam: ModalHandler;
  deleteAdmin: ModalHandler;
  deleteUser: ModalHandler;
  deletedUser: User | null;
  deletedProject: Project | null;
  team: Team;
  handleCreateSubmit: (createProjectDto: ProjectDto) => void;
  handleAddUserSubmit: (user: User) => Promise<void>;
  handleAddAdminSubmit: (user: User) => void;
  handleDeleteProject: (projectId: number) => Promise<void>;
  handleDeleteUser: (userId: number) => Promise<void>;
  handleDeleteAdmin: (userId: number) => Promise<void>;
  handleLeaveTeam: () => void;
}

const Modals: React.FC<ModalsProps> = ({
  createProject,
  deleteProject,
  addUser,
  addAdmin,
  leaveTeam,
  deleteAdmin,
  deleteUser,
  deletedProject,
  deletedUser,
  team,
  handleCreateSubmit,
  handleAddUserSubmit,
  handleAddAdminSubmit,
  handleDeleteProject,
  handleDeleteUser,
  handleDeleteAdmin,
  handleLeaveTeam,
}) => (
  <>
    <ModalForm open={createProject.isOpen} handleClose={createProject.close}>
      <ProjectForm
        onSubmit={handleCreateSubmit}
        onCancel={createProject.close}
        project={null}
      />
    </ModalForm>
    <ModalForm handleClose={deleteProject.close} open={deleteProject.isOpen}>
      <DeleteProjectForm
        project={deletedProject}
        onClose={deleteProject.close}
        onDelete={handleDeleteProject}
      />
    </ModalForm>
    <ModalForm handleClose={deleteUser.close} open={deleteUser.isOpen}>
      <DeleteUserModal
        user={deletedUser}
        isAdmin={false}
        onClose={deleteUser.close}
        onDelete={handleDeleteUser}
      />
    </ModalForm>
    <ModalForm handleClose={deleteAdmin.close} open={deleteAdmin.isOpen}>
      <DeleteUserModal
        user={deletedUser}
        isAdmin={true}
        onClose={deleteUser.close}
        onDelete={handleDeleteAdmin}
      />
    </ModalForm>
    <ModalForm handleClose={deleteProject.close} open={deleteProject.isOpen}>
      <DeleteProjectForm
        project={deletedProject}
        onClose={deleteProject.close}
        onDelete={handleDeleteProject}
      />
    </ModalForm>
    <ModalForm handleClose={addUser.close} open={addUser.isOpen}>
      <AddUserForm onClose={addUser.close} onSubmit={handleAddUserSubmit} />
    </ModalForm>
    <ModalForm handleClose={addAdmin.close} open={addAdmin.isOpen}>
      <AddAdminForm onClose={addAdmin.close} onSubmit={handleAddAdminSubmit} />
    </ModalForm>
    <ModalForm handleClose={leaveTeam.close} open={leaveTeam.isOpen}>
      <LeaveTeamForm
        onClose={leaveTeam.close}
        team={team}
        onLeave={handleLeaveTeam}
      />
    </ModalForm>
  </>
);

export default Modals;
