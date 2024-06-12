export const passwordRegex = new RegExp(
  '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}$',
);

export enum TeamRole {
  COLLABORATOR = 'collaborator',
  ADMIN = 'admin',
}

export enum AdminRole {
  USER = 'user',
  ADMIN = 'admin',
}
