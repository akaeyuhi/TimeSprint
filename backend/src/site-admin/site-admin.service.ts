import { Injectable, NotFoundException } from '@nestjs/common';
import { SiteAdminRepository } from './site-admin.repository';
import { User } from '../user/entities/user.entity';
import { SiteAdmin } from 'src/site-admin/entities/site-admin.entity';

@Injectable()
export class SiteAdminService {
  constructor(private readonly siteAdminRepository: SiteAdminRepository) {}

  async addSiteAdmin(user: User): Promise<SiteAdmin> {
    return await this.siteAdminRepository.create(user);
  }

  async removeSiteAdmin(userId: string): Promise<void> {
    const siteAdmin = await this.siteAdminRepository.findByUserId(userId);
    if (!siteAdmin) {
      throw new NotFoundException(
        `Site admin with user ID ${userId} not found`,
      );
    }
    await this.siteAdminRepository.delete(siteAdmin.id);
  }

  async findAllSiteAdmins(): Promise<SiteAdmin[]> {
    return await this.siteAdminRepository.findAll();
  }

  async isUserSiteAdmin(userId: string): Promise<boolean> {
    const siteAdmin = await this.siteAdminRepository.findByUserId(userId);
    return !!siteAdmin;
  }
}
