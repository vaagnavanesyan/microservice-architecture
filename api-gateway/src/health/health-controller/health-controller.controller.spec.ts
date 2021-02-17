import { Test, TestingModule } from '@nestjs/testing';
import { HealthControllerController } from './health-controller.controller';

describe('HealthControllerController', () => {
  let controller: HealthControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthControllerController],
    }).compile();

    controller = module.get<HealthControllerController>(HealthControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
