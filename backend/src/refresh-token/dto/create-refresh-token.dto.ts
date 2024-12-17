export class CreateRefreshTokenDto {
  userId: string;
  token: string;
  isBanned?: boolean = false;
}
