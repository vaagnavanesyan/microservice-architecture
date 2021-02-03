import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private envName: string;
  constructor(private configService: ConfigService) {
    this.envName = 'GREETING';
  }
  getHello(): string {
    return (
      this.configService.get(this.envName) ||
      `There is no ${this.envName} variable`
    );
  }
}
