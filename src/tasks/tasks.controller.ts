import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskProgressDto } from './dto/update-task-progress';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post('')
  @ApiOperation({ description: 'API endpoint to create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid task data' })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('user/:userId')
  @ApiOperation({ description: 'API endpoint to get all tasks by a user' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully!' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getTasksByUser(@Param('userId') userId: string) {
    return this.taskService.findTasksByUser(+userId);
  }

  @Get('habit/:habitId')
  @ApiOperation({
    description: 'API endpoint to get all tasks related to a habit',
  })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully!' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 404, description: 'Habit not found' })
  getTasksByHabit(@Param('habitId') habitId: number) {
    return this.taskService.findTasksByHabit(habitId);
  }

  @Patch(':taskId')
  @ApiOperation({ description: 'API endpoint to update a task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully!' })
  @ApiResponse({ status: 400, description: 'Invalid task data' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(+taskId, updateTaskDto);
  }

  // Route to update task progress
  @Patch(':taskId/progress')
  @ApiOperation({
    description: 'API endpoint to update the progress of a task',
  })
  @ApiResponse({
    status: 200,
    description: 'Task progress updated successfully!',
  })
  @ApiResponse({ status: 400, description: 'Invalid progress data' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  updateTaskProgress(
    @Param('taskId') taskId: string,
    @Body() updateTaskProgressDto: UpdateTaskProgressDto,
  ) {
    return this.taskService.updateTaskProgress(+taskId, updateTaskProgressDto);
  }

  // Route to manually trigger a reminder email for a specific task
  @Post(':taskId/reminder')
  @ApiOperation({
    description: 'API endpoint to send a reminder via email for a task',
  })
  @ApiResponse({ status: 200, description: 'Task reminder sent successfully!' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  sendTaskReminder(@Param('taskId') taskId: string) {
    return this.taskService.sendTaskReminder(+taskId);
  }
}
