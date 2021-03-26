import { Expose } from 'class-transformer';

export class UserCreatedPayload {
  @Expose() email: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
}
