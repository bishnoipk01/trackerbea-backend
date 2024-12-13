import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'Title of the task (optional)',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Description of the task (optional)',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Due date of the task (optional)',
    required: false,
  })
  dueDate?: Date;

  @ApiProperty({
    description: 'Task completion status (optional)',
    required: false,
  })
  completed?: boolean;

  @ApiProperty({
    description: 'Habit ID if linked to a habit (optional)',
    required: false,
  })
  habitId?: number;
}
