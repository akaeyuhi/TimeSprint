import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import {SiteAdminModule} from "src/site-admin/site-admin.module";
import {SiteAdminService} from "src/site-admin/site-admin.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), SiteAdminModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, SiteAdminService],
})
export class UserModule {}
