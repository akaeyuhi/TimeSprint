import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LeisureActivityService } from './leisure-activity.service';
import { LeisureActivity } from './entities/leisure-activity.entity';
import { CreateLeisureActivityDto } from 'src/leisure-activity/dto/create-leisure-activity.dto';
import { UpdateLeisureActivityDto } from 'src/leisure-activity/dto/update-leisure-activity.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { Task } from 'src/task/entities/task.entity';

@ApiTags('LeisureActivities')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('activities')
export class LeisureActivityController {
  constructor(
    private readonly leisureActivityService: LeisureActivityService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates new activity.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LeisureActivity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createLeisureActivity(
    @Body() createLeisureActivityDto: CreateLeisureActivityDto,
  ): Promise<LeisureActivity> {
    return await this.leisureActivityService.createLeisureActivity(
      createLeisureActivityDto,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates activity by id' })
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Activity not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async updateLeisureActivity(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateLeisureActivityDto: UpdateLeisureActivityDto,
  ): Promise<LeisureActivity> {
    return await this.leisureActivityService.updateLeisureActivity(
      id,
      updateLeisureActivityDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes activity by id' })
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Activity not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async deleteLeisureActivity(@Param('id') id: string): Promise<void> {
    await this.leisureActivityService.deleteLeisureActivity(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Gets activity by id' })
  @ApiParam({
    name: 'activityId',
    required: true,
    description: 'Activity identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Task })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Activity not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findLeisureActivityById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<LeisureActivity> {
    return await this.leisureActivityService.findLeisureActivityById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Gets all activities' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Task })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findAllLeisureActivities(): Promise<LeisureActivity[]> {
    return await this.leisureActivityService.findAllLeisureActivities();
  }
}
