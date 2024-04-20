// team-roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/utils';

export const TeamRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
