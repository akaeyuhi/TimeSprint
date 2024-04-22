import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TeamModule } from 'src/team/team.module';
import { TeamRepository } from 'src/team/team.repository';
import { ProjectRepository } from 'src/project/project.repository';

@Module({
  imports: [TeamModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, TeamRepository],
})
export class ProjectModule {}
