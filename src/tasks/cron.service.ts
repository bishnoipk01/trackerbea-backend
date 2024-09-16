import { Inject, Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { Logger } from 'winston';

@Injectable()
export class CronService {
  constructor(
    private readonly tasksService: TasksService,
    @Inject('winston') private readonly logger: Logger,
  ) {
    // Schedule a cron job to run every day at 8 AM
    cron.schedule('0 8 * * *', () => {
      this.sendDailyReminders();
    });
  }

  async sendDailyReminders() {
    try {
      // Fetch tasks that are due today and send reminders
      const tasksDueToday = await this.tasksService.findTasksDueToday();
      tasksDueToday.forEach((task: Task) => {
        this.tasksService.sendTaskReminder(task.userId, task.id);
      });
    } catch (error) {
      this.logger.error('Error sending reminder', { stack: error.stack });
    }
  }
}
