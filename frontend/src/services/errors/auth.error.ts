import { BaseError } from 'src/services/errors/base.error';

export class AuthError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
