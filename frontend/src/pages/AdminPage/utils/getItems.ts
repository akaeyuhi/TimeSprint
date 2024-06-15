import { RootService } from 'src/services';
import { store } from 'src/stores/root.store';
const services = store.services;

export async function getItems(service: keyof RootService) {
  const variants = {
    userService: () => services['userService'].getAllUsers(),
    projectService: () => services['projectService'].getAllProjects(),
    teamService: () => services['teamService'].getAllTeams(),
    taskService: () => services['projectService'].getAllTasks(),
    activityService: () => services['activityService'].getActivities(),
    authService: () => null,
  };

  return variants[service]();
}

export async function deleteItem(id: string, service: keyof RootService) {
  const variants = {
    userService: () => services['userService'].deleteUser(id),
    projectService: () => services['projectService'].deleteProject(id),
    teamService: () => services['teamService'].deleteTeam(id),
    taskService: () => services['projectService'].deleteTaskAsAdmin(id),
    activityService: () => services['activityService'].deleteActivity(id),
    authService: () => null,
  };

  return variants[service]();
}

export async function updateItem(
  dto: any,
  id: string,
  service: keyof RootService
) {
  const variants = {
    userService: () => services['userService'].updateUser(id, dto),
    projectService: () => services['projectService'].updateProject(id, dto),
    teamService: () => services['teamService'].updateTeam(id, dto),
    taskService: () => services['projectService'].updateTask(id, dto),
    activityService: () => services['activityService'].updateActivity(id, dto),
    authService: () => null,
  };

  return variants[service]();
}
