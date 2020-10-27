import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserControllerController {
  @Get()
  getUsers(): string {
    return 'This action returns all cats';
  }
}
