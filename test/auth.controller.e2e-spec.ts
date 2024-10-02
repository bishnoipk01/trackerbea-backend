import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import AppModule or AuthModule
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Enable validation pipes for DTO validation
    await app.init();

    prismaService = app.get(PrismaService);
    await prismaService.$connect(); // Connect to the test database
  });

  afterAll(async () => {
    await prismaService.$disconnect(); // Disconnect after tests
    await app.close();
  });

  beforeEach(async () => {
    // Clear the test database between tests
    await prismaService.task.deleteMany({});
    await prismaService.habit.deleteMany({});
    await prismaService.user.deleteMany({});
  });

  it('should signup a new user', async () => {
    const signupDto = {
      name: 'testUser',
      email: 'testuser@example.com',
      password: 'TestPassword123',
    };

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupDto)
      .expect(201); // Expect 201 Created response

    const user = await prismaService.user.findUnique({
      where: { email: signupDto.email },
    });

    expect(user).toBeDefined(); // Check if user is created in the database
    expect(user.email).toBe(signupDto.email);
  });

  it('should login with valid credentials', async () => {
    // First, create a user
    const signupDto = {
      name: 'testUser',
      email: 'testuser@example.com',
      password: 'TestPassword123',
    };

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupDto)
      .expect(201);

    const loginDto = {
      email: 'testuser@example.com',
      password: 'TestPassword123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200); // Expect 200 OK response

    expect(response.body.access_token).toBeDefined(); // Check for JWT token in the response
  });

  it('should reject login with invalid credentials', async () => {
    const loginDto = {
      email: 'wronguser@example.com',
      password: 'WrongPassword123',
    };

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(401); // Expect 401 Unauthorized response
  });
});
