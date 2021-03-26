import { Expose } from 'class-transformer';

export class JwtPayload {
  @Expose() email: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
}
