import { Module } from '@nestjs/common';
import { SiteAdminService } from './site-admin.service';

@Module({
  providers: [SiteAdminService],
})
export class SiteAdminModule {}
