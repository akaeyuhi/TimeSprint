import { SetMetadata } from '@nestjs/common';
import { AdminRole } from 'src/user/utils';

export const ROLES_KEY = 'adminRole';
export const IsUserRole = (role: AdminRole) => SetMetadata(ROLES_KEY, role);
