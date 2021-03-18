import { Expose } from 'class-transformer';

export class JwtPayload {
  @Expose() login: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
}
