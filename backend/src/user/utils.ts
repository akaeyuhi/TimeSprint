export const passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$');

export enum TeamRole {
  COLLABORATOR = 'collaborator',
  ADMIN = 'admin',
}

export enum AdminRole {
  USER = 'user',
  ADMIN = 'admin',
}
