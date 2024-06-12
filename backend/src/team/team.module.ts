import { forwardRef, Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/team/entities/team.entity';
import { TeamRepository } from 'src/team/team.repository';
import { UserModule } from 'src/user/user.module';
import { TaskModule } from 'src/task/task.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    UserModule,
    forwardRef(() => ProjectModule),
    TaskModule,
    TypeOrmModule.forFeature([Team]),
  ],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
  exports: [TeamService],
})
export class TeamModule {}
