import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findById(id);
    const updatedUser = { ...existingUser, ...updateUserDto };
    return this.userRepository.updateUser(id, updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    const existingUser = await this.findById(id);
    await this.userRepository.deleteUser(existingUser.id);
  }

  async findUserWithPassword(email: string) {
    return this.userRepository.getUserWithPassword(email);
  }
}
