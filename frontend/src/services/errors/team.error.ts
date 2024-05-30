import { BaseError } from 'src/services/errors/base.error';

export class TeamError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'TeamError';
  }
}
