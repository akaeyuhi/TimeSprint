import { BaseError } from 'src/services/errors/base.error';

export class ProjectError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectError';
  }
}
