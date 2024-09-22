import { Test, TestingModule } from '@nestjs/testing';
import { HabitsService } from './habits.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('HabitsService', () => {
  let service: HabitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitsService, PrismaService],
    }).compile();

    service = module.get<HabitsService>(HabitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
