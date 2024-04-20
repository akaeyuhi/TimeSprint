import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.repository.create(userData);
    return this.repository.save(newUser);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    await this.repository.update(id, userData);
    return this.findById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async getUserWithPassword(email: string): Promise<User> {
    return this.repository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.id')
      .addSelect('user.password')
      .addSelect('user.username')
      .addSelect('user.email')
      .addSelect('user.role')
      .where('user.email = :email', { email })
      .getOne();
  }
}
