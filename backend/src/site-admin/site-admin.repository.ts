import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteAdmin } from './entities/site-admin.entity';
import { IRepository } from 'src/interfaces/repository.interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SiteAdminRepository implements IRepository<SiteAdmin> {
  constructor(
    @InjectRepository(SiteAdmin)
    private readonly repository: Repository<SiteAdmin>,
  ) {}

  async create(user: User): Promise<SiteAdmin> {
    const admin = this.repository.create({ user });
    console.log(admin);
    return await this.repository.save(admin);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<SiteAdmin[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<SiteAdmin> {
    return await this.repository.findOneBy({ id });
  }

  async findByUserId(userId: string): Promise<SiteAdmin | undefined> {
    return await this.repository.findOne({ where: { user: { id: userId } } });
  }

  async update(id: string, data: Partial<SiteAdmin>): Promise<SiteAdmin> {
    const admin = await this.findById(id);
    if (!admin) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.repository.update(id, data);
    return admin;
  }
}
