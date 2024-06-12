import { User } from 'src/models/user.model';

export type Auth = {
  refreshToken: string;
  accessToken: string;
  user: User;
};

export type Return<T> = T | null;

