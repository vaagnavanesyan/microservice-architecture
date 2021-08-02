import { UserCreatedPayload } from '../payloads';

export class UserCreatedEvent {
  constructor(public readonly payload: UserCreatedPayload) {}
}
