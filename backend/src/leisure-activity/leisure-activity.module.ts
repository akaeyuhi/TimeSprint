import { Module } from '@nestjs/common';
import { LeisureActivityService } from './leisure-activity.service';
import { LeisureActivityController } from './leisure-activity.controller';

@Module({
  controllers: [LeisureActivityController],
  providers: [LeisureActivityService],
})
export class LeisureActivityModule {}
