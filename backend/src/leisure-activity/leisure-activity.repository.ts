import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeisureActivity } from './entities/leisure-activity.entity';
import { IRepository } from '../interfaces/repository.interface';

@Injectable()
export class LeisureActivityRepository implements IRepository<LeisureActivity> {
  constructor(
    @InjectRepository(LeisureActivity)
    private readonly repository: Repository<LeisureActivity>,
  ) {}

  async create(data: Partial<LeisureActivity>): Promise<LeisureActivity> {
    const activity = this.repository.create(data);
    return await this.repository.save(activity);
  }

  async update(
    id: number,
    data: Partial<LeisureActivity>,
  ): Promise<LeisureActivity> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: number): Promise<LeisureActivity> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<LeisureActivity[]> {
    return await this.repository.find();
  }
}