import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { LeisureActivityService } from './leisure-activity.service';
import { LeisureActivity } from './entities/leisure-activity.entity';
import { CreateLeisureActivityDto } from 'src/leisure-activity/dto/create-leisure-activity.dto';
import { UpdateLeisureActivityDto } from 'src/leisure-activity/dto/update-leisure-activity.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('leisure-activities')
export class LeisureActivityController {
  constructor(
    private readonly leisureActivityService: LeisureActivityService,
  ) {}

  @Post()
  async createLeisureActivity(
    @Body() createLeisureActivityDto: CreateLeisureActivityDto,
  ): Promise<LeisureActivity> {
    return await this.leisureActivityService.createLeisureActivity(
      createLeisureActivityDto,
    );
  }

  @Patch(':id')
  async updateLeisureActivity(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLeisureActivityDto: UpdateLeisureActivityDto,
  ): Promise<LeisureActivity> {
    return await this.leisureActivityService.updateLeisureActivity(
      id,
      updateLeisureActivityDto,
    );
  }

  @Delete(':id')
  async deleteLeisureActivity(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.leisureActivityService.deleteLeisureActivity(id);
  }

  @Get(':id')
  async findLeisureActivityById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LeisureActivity> {
    return await this.leisureActivityService.findLeisureActivityById(id);
  }

  @Get()
  async findAllLeisureActivities(): Promise<LeisureActivity[]> {
    return await this.leisureActivityService.findAllLeisureActivities();
  }

  @Get(':id/user')
  async getUsersByActivity(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return await this.leisureActivityService.getUsersByActivity(id);
  }
}
