import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }
  async onModuleInit() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      console.log('Database is connected');
    } catch (err) {
      console.error('Database connection failed', err);
    }
  }
}
