// team-roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { TeamRole } from 'src/user/utils';

export const TeamRoles = (role: TeamRole) => SetMetadata('role', role);
