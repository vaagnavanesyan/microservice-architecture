import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserControllerController {
  @Get(':id')
  getUser(@Param() { id }): any {
    return {
      id,
      name: 'test',
    };
  }
}
