import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SiteAdminService } from '../site-admin.service';

@Injectable()
export class SiteAdminGuard implements CanActivate {
  constructor(
      private readonly siteAdminService: SiteAdminService,
      private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isSiteAdmin = this.reflector.get<boolean>('isSiteAdmin', context.getHandler());
    if (!isSiteAdmin) {
      return true; // Allow access if the route is not restricted to site admins
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    return await this.siteAdminService.isUserSiteAdmin(userId);
  }
}
