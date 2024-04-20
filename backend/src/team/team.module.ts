import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/team/entities/team.entity';
import { TeamRepository } from 'src/team/team.repository';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Team]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository, UserService, UserRepository],
})
export class TeamModule {}
