// is-site-admin.decorator.ts

import { SetMetadata } from '@nestjs/common';

export const IsSiteAdmin = () => SetMetadata('isSiteAdmin', true);
