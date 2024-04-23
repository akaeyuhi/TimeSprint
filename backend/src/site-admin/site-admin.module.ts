import { Module } from '@nestjs/common';
import { SiteAdminService } from './site-admin.service';
import {SiteAdminRepository} from "src/site-admin/site-admin.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SiteAdmin} from "src/site-admin/entities/site-admin.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SiteAdmin])],
  providers: [SiteAdminService, SiteAdminRepository],
})
export class SiteAdminModule {}
