import { Return } from 'src/services/types';
import BaseService from './base.service';
import { ActivityError } from './errors/activity.error';
import { LeisureActivity } from 'src/models/activity.model';
import { LeisureActivityDto } from 'src/services/dto/activity.dto';

export class ActivityService extends BaseService {
  async getActivities(): Promise<Return<LeisureActivity[]>> {
    try {
      return this.httpRequest.get<LeisureActivity[]>(`/activities/}`);
    } catch (error) {
      throw new ActivityError('Error getting activities');
    }
  }

  async createActivity(
    dto: LeisureActivityDto
  ): Promise<Return<LeisureActivity>> {
    try {
      return this.httpRequest.post<LeisureActivity>(`/activities/`, dto);
    } catch (error) {
      throw new ActivityError('Error creating activity');
    }
  }

  async deleteActivity(id: number): Promise<Return<LeisureActivity>> {
    try {
      return this.httpRequest.delete<LeisureActivity>(`/activities/${id}`);
    } catch (error) {
      throw new ActivityError('Error deleting activity');
    }
  }

  async getActivityById(id: number): Promise<Return<LeisureActivity>> {
    try {
      return this.httpRequest.get<LeisureActivity>(`/activities/${id}`);
    } catch (error) {
      throw new ActivityError('Error getting activity');
    }
  }

  async updateActivity(
    dto: LeisureActivityDto,
    activityId: number
  ): Promise<Return<LeisureActivity>> {
    try {
      return this.httpRequest.patch<LeisureActivity>(
        `/activities/${activityId}`,
        dto
      );
    } catch (error) {
      throw new ActivityError('Error updating user activity');
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
      throw new ActivityError('Error toggling user activity');
    }
  }
}
