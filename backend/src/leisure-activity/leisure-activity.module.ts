import { Module } from '@nestjs/common';
import { LeisureActivityService } from './leisure-activity.service';
import { LeisureActivityController } from './leisure-activity.controller';
import { LeisureActivityRepository } from 'src/leisure-activity/leisure-activity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LeisureActivity } from 'src/leisure-activity/entities/leisure-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeisureActivity])],
  controllers: [LeisureActivityController],
  providers: [LeisureActivityService, LeisureActivityRepository],
})
export class LeisureActivityModule {}
