import { Module } from '@nestjs/common';
import { LeisureActivityService } from './leisure-activity.service';
import { LeisureActivityController } from './leisure-activity.controller';
import { LeisureActivityRepository } from 'src/leisure-activity/leisure-activity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeisureActivity } from 'src/leisure-activity/entities/leisure-activity.entity';
import { SiteAdminModule } from 'src/site-admin/site-admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([LeisureActivity]), SiteAdminModule],
  controllers: [LeisureActivityController],
  providers: [LeisureActivityService, LeisureActivityRepository],
  exports: [LeisureActivityService],
})
export class LeisureActivityModule {}
