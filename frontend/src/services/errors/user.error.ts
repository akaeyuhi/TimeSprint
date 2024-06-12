import { BaseError } from 'src/services/errors/base.error';

export class UserError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'UserError';
  }
}
