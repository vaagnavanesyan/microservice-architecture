import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserCreatedEvent } from '@vaagnavanesyan/common';
import { nameof } from 'ts-simple-nameof';

@Controller()
export class BillingController {
  @EventPattern(nameof(UserCreatedEvent))
  async handleUserCreated(data: Record<string, unknown>) {
    console.log(data);
  }
}
