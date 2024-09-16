import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createHabitDto: CreateHabitDto) {
    return this.prisma.habit.create({
      data: {
        ...createHabitDto,
        userId, // Associate the habit with the user
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
}
