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

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHabitDto: CreateHabitDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.habitsService.create(userId, createHabitDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getHabitsByUser(@Req() req: any) {
    const userId = req.user.userId;
    return this.habitsService.findHabitsByUser(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.update(+id, updateHabitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitsService.remove(+id);
  }
}
