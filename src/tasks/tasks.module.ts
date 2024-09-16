import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import { LoggerModule } from 'src/logger/logger.module';
import { CronService } from './cron.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    PrismaService,
    EmailService,
    LoggerModule,
    CronService,
  ],
})
export class TasksModule {}
