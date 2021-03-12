import { Body, Controller, Get, Put, Req, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { MetricsInterceptor } from '../interceptors';
import { UserModel } from '../models';
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
  getMe(@Req() request: Request) {
    return {
      login: request.header('X-Login'),
      firstName: request.header('X-First-Name'),
      lastName: request.header('X-Last-Name'),
    };
  }

  @Put('me')
  async update(@Req() request, @Body() fields: UserModel): Promise<{ accessToken: string }> {
    const login = request.header('X-Login');
    let user = await this.usersRepository.findOne({ where: { login } });
    if (!user) {
      throw new UnauthorizedException();
    }
    await this.usersRepository.update(user.id, fields);
    user = await this.usersRepository.findOne(user.id);
    const payload: JwtPayload = { firstName: user.firstName, lastName: user.lastName, login: user.login };
    const accessToken = this.jwtService.sign(payload, { keyid: '1' });
    return { accessToken };
  }
}
