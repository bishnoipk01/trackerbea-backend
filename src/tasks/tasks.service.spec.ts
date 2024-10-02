import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service'; // Mock PrismaService
import { EmailService } from '../email/email.service'; // Mock EmailService

describe('TasksService', () => {
  let service: TasksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService, // Mock PrismaService
          useValue: {
            task: {
              create: jest
                .fn()
                .mockResolvedValue({ id: 1, title: 'Test Task' }), // Mock task.create
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: EmailService,
          useValue: {}, // Provide a mock for EmailService if needed
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const taskData = {
      userId: 1,
      title: 'Test Task',
      description: 'A simple task',
    };
    const task = await service.createTask(taskData); // 1 = userId

    expect(task).toEqual({ id: 1, title: 'Test Task' });
    expect(prismaService.task.create).toHaveBeenCalledWith({
      data: { ...taskData, userId: 1, habitId: null },
    });
  });
});
