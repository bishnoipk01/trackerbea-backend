import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskProgressDto } from './dto/update-task-progress';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post(':userId')
  createTask(
    @Param('userId') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.createTask(+userId, createTaskDto);
  }

  @Get('user/:userId')
  getTasksByUser(@Param('userId') userId: string) {
    return this.taskService.findTasksByUser(+userId);
  }

  @Get('habit/:habitId')
  getTasksByHabit(@Param('habitId') habitId: number) {
    return this.taskService.findTasksByHabit(habitId);
  }

  @Patch(':taskId')
  update(
    @Param('taskId') taskId: string,
    @Body() UpdateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(+taskId, UpdateTaskDto);
  }

  // Route to update task progress
  @Patch(':taskId/progress')
  updateTaskProgress(
    @Param('taskId') taskId: string,
    @Body() updateTaskProgressDto: UpdateTaskProgressDto,
  ) {
    return this.taskService.updateTaskProgress(+taskId, updateTaskProgressDto);
  }
  // Route to manually trigger a reminder email for a specific task
  @Post(':taskId/reminder')
  sendTaskReminder(@Param('taskId') taskId: string) {
    return this.taskService.sendTaskReminder(+taskId);
  }
}
