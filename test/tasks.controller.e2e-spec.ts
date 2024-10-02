import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from 'src/tasks/tasks.controller';
import { TasksService } from 'src/tasks/tasks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EmailService } from 'src/email/email.service';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, PrismaService, EmailService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await prismaService.$connect(); // Connect to the test database
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // Clear the test database between tests
    await prismaService.task.deleteMany({});
    await prismaService.habit.deleteMany({});
    await prismaService.user.deleteMany({});

    await prismaService.user.create({
      data: {
        id: 1, // Ensure this ID matches what you use when creating the task
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'hashedpassword',
      },
    });
    await prismaService.habit.create({
      data: {
        id: 1,
        name: 'Test Habit',
        description: 'A habit for testing',
        frequency: 'weekly',
        userId: 1,
      },
    });
  });

  it('/tasks (POST) - should create a task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'A simple task',
      userId: 1,
    };

    return request(app.getHttpServer())
      .post('/tasks')
      .send(taskData)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual('Test Task');
      });
  });
  it('should create a new task and link it to a habit', async () => {
    const taskData = {
      title: 'Test Task with Habit',
      description: 'Task linked to habit',
      habitId: 1, // Linking the task to habit ID 1
      userId: 1,
    };

    return request(app.getHttpServer())
      .post('/tasks')
      .send(taskData)
      .expect(201)
      .expect((res) => {
        expect(res.body.title).toEqual('Test Task with Habit');
        expect(res.body).toHaveProperty('habitId');
        expect(res.body.habitId).toEqual(1);
      });
  });
});
