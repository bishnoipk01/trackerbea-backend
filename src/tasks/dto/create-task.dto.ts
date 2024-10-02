import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  userId: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsOptional()
  habitId?: number; // Optionally link the task to a habit
}
