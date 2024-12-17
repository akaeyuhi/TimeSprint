import { Injectable, NotFoundException } from '@nestjs/common';
import { IRepository } from 'src/interfaces/repository.interface';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokenRepository implements IRepository<RefreshToken> {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repository: Repository<RefreshToken>,
  ) {}

  async create(data: Partial<RefreshToken>): Promise<RefreshToken> {
    const token = this.repository.create(data);
    return await this.repository.save(token);
  }

  async update(id: string, data: Partial<RefreshToken>): Promise<RefreshToken> {
    const token = await this.findById(id);
    if (!token) {
      throw new NotFoundException(`Token with ID ${id} not found`);
    }
    return await this.repository.save({ ...token, ...data });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<RefreshToken> {
    return await this.repository.findOneBy({ id });
  }

  async findByToken(value: string): Promise<RefreshToken> {
    return await this.repository.findOneBy({ value });
  }

  async findAll(): Promise<RefreshToken[]> {
    return await this.repository.find();
  }
}
