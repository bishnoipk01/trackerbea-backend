import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma connected to the database');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      throw error;
    }
  }

  // You can use NestJS's built-in shutdown hooks instead of directly using process.on
  async enableShutdownHooks(app: INestApplication) {
    app.enableShutdownHooks();
    console.log('Shutdown hooks enabled');
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('Prisma disconnected from the database');
    } catch (error) {
      console.error('Failed to disconnect from the database:', error);
    }
  }

  // Optionally, add a warning before cleaning the database
  cleanDb() {
    console.log('Cleaning the database...');
    return this.$transaction([
      this.user.deleteMany(),
      this.task.deleteMany(),
      this.habit.deleteMany(),
    ]);
  }
}
