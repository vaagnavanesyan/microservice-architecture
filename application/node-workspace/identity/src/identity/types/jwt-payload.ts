import { Expose } from 'class-transformer';

export class JwtPayload {
  @Expose() id: number;
  @Expose() email: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() isAdmin: boolean;
}
