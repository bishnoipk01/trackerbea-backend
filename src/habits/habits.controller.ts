import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Habits')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new habit' })
  @ApiResponse({
    status: 201,
    description: 'The habit has been successfully created.',
    type: CreateHabitDto,
  })
  create(@Body() createHabitDto: CreateHabitDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.habitsService.create(userId, createHabitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all habits by a user' })
  @ApiResponse({
    status: 200,
    description: 'Habits retrieved successfully.',
    type: [CreateHabitDto],
  })
  getHabitsByUser(@Req() req: any) {
    const userId = req.user.userId;
    return this.habitsService.findHabitsByUser(+userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific habit by ID' })
  @ApiResponse({
    status: 200,
    description: 'The habit has been successfully retrieved.',
    type: CreateHabitDto,
  })
  findOne(@Param('id') id: string) {
    return this.habitsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a habit' })
  @ApiResponse({
    status: 200,
    description: 'The habit has been successfully updated.',
    type: UpdateHabitDto,
  })
  update(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.update(+id, updateHabitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a habit' })
  @ApiResponse({
    status: 200,
    description: 'The habit has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.habitsService.remove(+id);
  }

  @Post(':habitId/complete')
  @ApiOperation({ summary: 'Complete a habit and update streak' })
  @ApiResponse({
    status: 200,
    description: 'Habit completion successful and streak updated.',
  })
  completeHabit(@Param('habitId') habitId: string) {
    return this.habitsService.completeHabit(+habitId);
  }

  @Post(':habitId/reset-streak')
  @ApiOperation({ summary: 'Reset the streak of a habit' })
  @ApiResponse({
    status: 200,
    description: 'The streak for the habit has been reset.',
  })
  resetStreak(@Param('habitId') habitId: string) {
    return this.habitsService.resetStreak(+habitId);
  }
}
