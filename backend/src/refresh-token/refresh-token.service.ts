import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { RefreshTokenRepository } from 'src/refresh-token/refresh-token.repository';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
  async create(createRefreshTokenDto: CreateRefreshTokenDto) {
    return await this.refreshTokenRepository.create(createRefreshTokenDto);
  }

  async findAll() {
    return await this.refreshTokenRepository.findAll();
  }

  async findOne(id: string) {
    return await this.refreshTokenRepository.findById(id);
  }

  async findByToken(token: string) {
    return await this.refreshTokenRepository.findByToken(token);
  }

  async update(id: string, updateRefreshTokenDto: UpdateRefreshTokenDto) {
    return await this.refreshTokenRepository.update(id, updateRefreshTokenDto);
  }

  async toggleBan(tokenValue: string) {
    const token = await this.refreshTokenRepository.findByToken(tokenValue);
    if (!token) {
      throw new NotFoundException(`Such token doesn't exist`);
    }
    return await this.update(token.id, { isBanned: !token.isBanned });
  }

  async remove(id: string) {
    return await this.refreshTokenRepository.delete(id);
  }

  async removeByValue(value: string) {
    const token = await this.findByToken(value);
    return await this.remove(token.id);
  }

  async isTokenExists(token: string) {
    return !!(await this.findByToken(token));
  }
}
