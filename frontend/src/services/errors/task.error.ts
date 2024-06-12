import { BaseError } from 'src/services/errors/base.error';

export class TaskError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'TaskError';
  }
}
