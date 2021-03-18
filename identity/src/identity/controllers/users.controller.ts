import { Body, Controller, Get, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { MetricsInterceptor } from '../interceptors';
import { UserModel } from '../models';
import { GetUser } from '../services/user-decorator';
import { JwtPayload } from '../types';

@Controller('users')
@UseInterceptors(MetricsInterceptor)
export class UsersController {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@GetUser() user: User) {
    const { login, firstName, lastName } = user;
    return { login, firstName, lastName };
  }

  @Put('me')
  @UseGuards(AuthGuard('jwt'))
  async update(@GetUser() user: User, @Body() fields: UserModel): Promise<{ accessToken: string }> {
    await this.usersRepository.update(user.id, fields);
    const payload: JwtPayload = { firstName: user.firstName, lastName: user.lastName, login: user.login };
    const accessToken = this.jwtService.sign(payload, { keyid: '1' });
    return { accessToken };
  }
}
