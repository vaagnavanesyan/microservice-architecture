import { UserCreatedPayload } from '../../interfaces/user-created.payload';
export class UserCreatedEvent {
  constructor(public readonly payload: UserCreatedPayload) {}
}
