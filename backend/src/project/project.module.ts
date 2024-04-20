import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {UserModule} from "src/user/user.module";
import {TeamModule} from "src/team/team.module";
import {TeamService} from "src/team/team.service";
import {TeamRepository} from "src/team/team.repository";
import {ProjectRepository} from "src/project/project.repository";

@Module({
  imports: [TeamModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, TeamRepository],
})
export class ProjectModule {}
