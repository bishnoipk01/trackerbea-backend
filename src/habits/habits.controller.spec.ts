import { Test, TestingModule } from '@nestjs/testing';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('HabitsController', () => {
  let controller: HabitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitsController],
      providers: [HabitsService, PrismaService],
    }).compile();

    controller = module.get<HabitsController>(HabitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
