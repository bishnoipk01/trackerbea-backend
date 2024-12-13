import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'User ID associated with the task',
    required: true,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'Title of the task', required: true })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the task', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Due date of the task',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({ description: 'Is the task completed?', required: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiProperty({
    description: 'Habit ID if linked to a habit',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  habitId?: number; // Optionally link the task to a habit
}
