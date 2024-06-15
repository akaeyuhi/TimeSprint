import { BaseError } from 'src/services/errors/base.error';

export class ActivityError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'ActivityError';
  }
}
