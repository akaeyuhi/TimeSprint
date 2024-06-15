import { Return } from 'src/services/types';
import BaseService from './base.service';
import { ActivityError } from './errors/activity.error';
import { LeisureActivity } from 'src/models/activity.model';
import { LeisureActivityDto } from 'src/services/dto/activity.dto';

export class ActivityService extends BaseService {
  async getActivities(): Promise<Return<LeisureActivity[]>> {
    try {
      return this.httpRequest.get<LeisureActivity[]>(`/activities/`);
    } catch (error) {
      throw new ActivityError('Error getting activities');
    }
  }

  async getActivityById(id: string): Promise<Return<LeisureActivity>> {
    try {
      return this.httpRequest.get<LeisureActivity>(`/activities/${id}`);
    } catch (error) {
      throw new ActivityError('Error getting activity');
    }
  }

  async updateActivity(
    activityId: string,
    dto: LeisureActivityDto
  ): Promise<Return<LeisureActivity>> {
    try {
      return this.httpRequest.patch<LeisureActivity>(
        `/activities/${activityId}`,
        dto
      );
    } catch (error) {
      throw new ActivityError('Error updating activity');
    }
  }

  async deleteActivity(activityId: string): Promise<Return<void>> {
    try {
      return this.httpRequest.delete<void>(`/activities/${activityId}`);
    } catch (error) {
      throw new ActivityError('Error deleting activity');
    }
  }

  async toggleActivity(
    activity: LeisureActivity
  ): Promise<Return<LeisureActivity>> {
    try {
      return this.httpRequest.patch<LeisureActivity>(
        `/activities/${activity.id}`,
        {
          isCompleted: !activity.isCompleted,
        }
      );
    } catch (error) {
      throw new ActivityError('Error toggling activity');
    }
  }
}
