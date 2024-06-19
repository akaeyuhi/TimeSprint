import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionConfiguration } from 'ormconfig';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { LeisureActivityModule } from './leisure-activity/leisure-activity.module';
import { SiteAdminModule } from './site-admin/site-admin.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../frontend', 'build'),
      serveRoot: '/app',
    }),
    TypeOrmModule.forRoot(DatabaseConnectionConfiguration),
    UserModule,
    TeamModule,
    AuthModule,
    ProjectModule,
    TaskModule,
    LeisureActivityModule,
    SiteAdminModule,
  ],
})
export class AppModule {}
