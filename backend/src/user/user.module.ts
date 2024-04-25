import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { SiteAdminModule } from 'src/site-admin/site-admin.module';
import { TaskModule } from 'src/task/task.module';
import { LeisureActivityModule } from 'src/leisure-activity/leisure-activity.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TaskModule,
    LeisureActivityModule,
    SiteAdminModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
