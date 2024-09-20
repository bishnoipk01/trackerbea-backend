import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Habit } from '@prisma/client';
import { isSameDay, isYesterday } from 'date-fns';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createHabitDto: CreateHabitDto) {
    return this.prisma.habit.create({
      data: {
        ...createHabitDto,
        userId, // Directly associate the habit with the user by their ID
      },
    });
  }

  async findHabitsByUser(userId: number) {
    return this.prisma.habit.findMany({
      where: { userId },
    });
  }

  async findOne(id: number) {
    return this.prisma.habit.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateHabitDto: UpdateHabitDto) {
    return this.prisma.habit.update({
      where: { id },
      data: updateHabitDto,
    });
  }

  async remove(id: number) {
    return this.prisma.habit.delete({
      where: { id },
    });
  }

  // Method to update the streak when a habit is completed
  async completeHabit(habitId: number): Promise<Habit> {
    const habit = await this.prisma.habit.findUnique({
      where: { id: habitId },
    });
    const now = new Date();

    if (!habit.lastCompleted) {
      // If habit has never been completed before, start streak
      return this.prisma.habit.update({
        where: { id: habitId },
        data: {
          streak: 1,
          lastCompleted: now,
        },
      });
    }

    const lastCompleted = habit.lastCompleted;

    if (isSameDay(lastCompleted, now)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Habit already completed today',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else if (isYesterday(lastCompleted)) {
      // If the last completion was yesterday, increment the streak
      return this.prisma.habit.update({
        where: { id: habitId },
        data: {
          streak: habit.streak + 1,
          lastCompleted: now,
        },
      });
    } else {
      // If more than a day has passed since last completion, reset the streak
      return this.prisma.habit.update({
        where: { id: habitId },
        data: {
          streak: 1,
          lastCompleted: now,
        },
      });
    }
  }

  // Method to reset streak manually
  async resetStreak(habitId: number): Promise<Habit> {
    return this.prisma.habit.update({
      where: { id: habitId },
      data: {
        streak: 0,
        lastCompleted: null,
      },
    });
  }
}
