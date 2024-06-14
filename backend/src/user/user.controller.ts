import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { IsUserRole } from 'src/site-admin/decorators/site-admin.decorator';
import { AdminRole } from 'src/user/utils';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller('users')
@UseGuards(JwtAuthGuard, SiteAdminGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: SiteAdminService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Gets all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Gets users by userId' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('by-username/:username')
  @ApiOperation({ summary: 'Gets user by username' })
  @ApiParam({ name: 'username', required: true, description: 'Username' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  @IsUserRole(AdminRole.ADMIN)
  @ApiOperation({ summary: 'Creates new user. Admin rights required' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates user data by id' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @IsUserRole(AdminRole.ADMIN)
  @ApiOperation({ summary: 'Deletes user by id. Admin rights required' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: null })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }

  @Post(':userId/tasks')
  @ApiOperation({ summary: 'Creates new task for user.' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Task })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createUserTask(
    @Param('userId') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.userService.createUserTask(createTaskDto, userId);
  }

  @Delete(':userId/tasks/:taskId')
  @ApiOperation({ summary: 'Deletes task from user account.' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiParam({ name: 'taskId', required: true, description: 'Task identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Task })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async deleteUserTask(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ): Promise<Task> {
    return await this.userService.deleteUserTask(userId, taskId);
  }

  @Post(':userId/activities/')
  @ApiOperation({ summary: 'Creates new activity for user' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LeisureActivity,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async addLeisureActivityToUser(
    @Param('userId') userId: string,
    @Body() activityDto: CreateLeisureActivityDto,
  ): Promise<LeisureActivity> {
    return await this.userService.addLeisureActivityToUser(userId, activityDto);
  }

  @Get(':userId/activities')
  @ApiOperation({ summary: 'Gets all user activities' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LeisureActivity,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getLeisureActivitiesForUser(
    @Param('userId') userId: string,
  ): Promise<LeisureActivity[]> {
    return await this.userService.getLeisureActivitiesForUser(userId);
  }

  @Delete(':userId/activities/:activityId')
  @ApiOperation({ summary: 'Deletes activity from user account.' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiParam({
    name: 'activityId',
    required: true,
    description: 'Activity identifier',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LeisureActivity,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Activity not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async deleteUserActivity(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ): Promise<LeisureActivity> {
    return await this.userService.deleteUserActivity(userId, taskId);
  }

  @Get(':userId/prioritized')
  @ApiOperation({ summary: 'Gets sorted by priority user tasks' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Task,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getPrioritizedTasksByUser(
    @Param('userId') userId: string,
  ): Promise<Task[]> {
    return await this.userService.getSortedUserTasks(userId);
  }

  @Post(':userId/grant-admin')
  @IsUserRole(AdminRole.ADMIN)
  @ApiOperation({ summary: 'Grants user admin status. Admin rights required' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: User,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async grantAdminPrivilege(@Param('userId') userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    await this.userService.changeUserRole(userId, AdminRole.ADMIN);
    await this.adminService.addSiteAdmin(user);
    return user;
  }

  @Post(':userId/revoke-admin')
  @IsUserRole(AdminRole.ADMIN)
  @ApiOperation({ summary: 'Revokes user admin status. Admin rights required' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async revokeAdminPrivilege(@Param('userId') userId: string): Promise<void> {
    await this.userService.changeUserRole(userId, AdminRole.USER);
    await this.adminService.removeSiteAdmin(userId);
  }

  @Get(':userId/tasks')
  @ApiOperation({
    summary: 'Gets tasks of the user',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'User identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Task })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findTasksInProject(@Param('userId') userId: string): Promise<Task[]> {
    return await this.userService.getUserTasks(userId);
  }
}
