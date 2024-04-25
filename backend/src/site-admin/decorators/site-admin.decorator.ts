import { SetMetadata } from '@nestjs/common';
import { AdminRole } from 'src/user/utils';

export const ROLES_KEY = 'role';
export const IsUserRole = (...roles: AdminRole[]) =>
  SetMetadata(ROLES_KEY, roles);
