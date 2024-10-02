import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskProgressDto } from './dto/update-task-progress';
import { EmailService } from '../email/email.service';
import { startOfDay, endOfDay } from 'date-fns'; // A utility library for working with dates
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        habitId: createTaskDto.habitId || null, // Optional habit linkage
      },
    });
  }

  async findTasksByUser(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findTasksByHabit(habitId: number) {
    return this.prisma.task.findMany({
      where: {
        habitId: habitId,
      },
    });
  }

  async updateTask(taskId: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new HttpException(
        `No task found with ID ${taskId}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        ...updateTaskDto,
        habitId: updateTaskDto.habitId || task.habitId, // Keep the current habitId if not updating
      },
    });
  }

  // Method to update task progress
  async updateTaskProgress(
    taskId: number,
    updateTaskProgressDto: UpdateTaskProgressDto,
  ) {
    const { progress, status } = updateTaskProgressDto;

    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        progress,
        status: status || (progress === 100 ? 'completed' : 'in-progress'),
      },
    });
  }
  // Method to send email reminders for tasks
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendTaskReminder(taskId: number, userId?: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { user: true },
    });

    if (
      task &&
      task.dueDate &&
      !task.completed &&
      new Date(task.dueDate) >= new Date()
    ) {
      const subject = `Reminder: Task "${task.title}" is due!`;
      const text = `Hi ${task.user.name},\n\nYour task "${task.title}" is due. Please complete it as soon as possible.`;

      console.log(task.user.email, subject);
      await this.emailService.sendTaskReminderEmail(
        task.user.email,
        subject,
        text,
      );
    }
  }
  // Method to find tasks due today
  async findTasksDueToday() {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    return this.prisma.task.findMany({
      where: {
        dueDate: {
          gte: todayStart, // Tasks due after or equal to the start of today
          lte: todayEnd, // Tasks due before or equal to the end of today
        },
        completed: false, // Only include tasks that are not completed
      },
      include: {
        user: true, // Include user details for sending emails
      },
    });
  }
}
