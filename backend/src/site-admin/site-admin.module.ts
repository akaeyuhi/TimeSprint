import { Module } from '@nestjs/common';
import { SiteAdminService } from './site-admin.service';
import { SiteAdminRepository } from 'src/site-admin/site-admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteAdmin } from 'src/site-admin/entities/site-admin.entity';
import { SiteAdminGuard } from 'src/site-admin/guards/site-admin.guard';

@Module({
  imports: [TypeOrmModule.forFeature([SiteAdmin])],
  providers: [SiteAdminService, SiteAdminRepository, SiteAdminGuard],
  exports: [SiteAdminService, SiteAdminGuard],
})
export class SiteAdminModule {}
