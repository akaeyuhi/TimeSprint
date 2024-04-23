import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { Task } from 'src/task/entities/task.entity';
import { LeisureActivity } from 'src/leisure-activity/entities/leisure-activity.entity';
import { CreateLeisureActivityDto } from 'src/leisure-activity/dto/create-leisure-activity.dto';
import { SiteAdminService } from 'src/site-admin/site-admin.service';
import { SiteAdminGuard } from 'src/site-admin/guards/site-admin.guard';
import { IsSiteAdmin } from 'src/site-admin/decorators/site-admin.decorator';
import { AdminRole } from 'src/user/utils';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: SiteAdminService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(SiteAdminGuard)
  @IsSiteAdmin()
  async delete(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }

  @Post(':userId/tasks')
  async createUserTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.userService.createUserTask(createTaskDto, userId);
  }

  @Delete(':userId/tasks/:taskId')
  async deleteUserTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    return await this.userService.deleteUserTask(userId, taskId);
  }

  @Post(':userId/activities/:activityId')
  async addLeisureActivityToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() activityDto: CreateLeisureActivityDto,
  ): Promise<User> {
    return await this.userService.addLeisureActivityToUser(userId, activityDto);
  }

  @Get(':userId/activities')
  async getLeisureActivitiesForUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<LeisureActivity[]> {
    return await this.userService.getLeisureActivitiesForUser(userId);
  }

  @Post(':userId/grant-admin')
  @UseGuards(SiteAdminGuard)
  @IsSiteAdmin()
  async grantAdminPrivilege(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    await this.userService.changeUserRole(userId, AdminRole.ADMIN);
    await this.adminService.addSiteAdmin(user);
    return user;
  }

  @Post(':userId/revoke-admin')
  @UseGuards(SiteAdminGuard)
  @IsSiteAdmin()
  async revokeAdminPrivilege(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.userService.changeUserRole(userId, AdminRole.USER);
    await this.adminService.removeSiteAdmin(userId);
  }
}
