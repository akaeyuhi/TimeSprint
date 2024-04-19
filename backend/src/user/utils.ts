export const passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$');

export enum UserRole {
  COLLABORATOR = 'collaborator',
  ADMIN = 'admin',
}
