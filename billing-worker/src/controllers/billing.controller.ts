import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserCreatedEvent, UserCreatedPayload } from '@vaagnavanesyan/common';
import { User } from 'src/entities/user.entity';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';

@Controller()
export class BillingController {
  @EventPattern(nameof(UserCreatedEvent))
  async handleUserCreated(data: UserCreatedPayload) {
    const repo = getRepository(User);
    await repo.save(data);
  }
}
