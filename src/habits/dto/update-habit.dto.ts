import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDto } from './create-habit.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHabitDto extends PartialType(CreateHabitDto) {
  @ApiProperty({ description: 'The name of the habit', required: false })
  name?: string;

  @ApiProperty({ description: 'The description of the habit', required: false })
  description?: string;

  @ApiProperty({ description: 'The frequency of the habit', required: false })
  frequency?: string;
}
