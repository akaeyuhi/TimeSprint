import { Injectable } from '@nestjs/common';
import { LeisureActivityRepository } from './leisure-activity.repository';
import { LeisureActivity } from './entities/leisure-activity.entity';
import { User } from '../user/entities/user.entity';
import { CreateLeisureActivityDto } from 'src/leisure-activity/dto/create-leisure-activity.dto';
import { UpdateLeisureActivityDto } from 'src/leisure-activity/dto/update-leisure-activity.dto';

@Injectable()
export class LeisureActivityService {
  constructor(
    private readonly leisureActivityRepository: LeisureActivityRepository,
  ) {}

  async createLeisureActivity(
    createActivityDto: CreateLeisureActivityDto,
  ): Promise<LeisureActivity> {
    return await this.leisureActivityRepository.create(createActivityDto);
  }

  async updateLeisureActivity(
    id: number,
    data: UpdateLeisureActivityDto,
  ): Promise<LeisureActivity> {
    return await this.leisureActivityRepository.update(id, data);
  }

  async deleteLeisureActivity(id: number): Promise<void> {
    await this.leisureActivityRepository.delete(id);
  }

  async findLeisureActivityById(id: number): Promise<LeisureActivity> {
    return await this.leisureActivityRepository.findById(id);
  }

  async findAllLeisureActivities(): Promise<LeisureActivity[]> {
    return await this.leisureActivityRepository.findAll();
  }
}
