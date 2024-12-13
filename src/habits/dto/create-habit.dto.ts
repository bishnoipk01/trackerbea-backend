import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHabitDto {
  @ApiProperty({ description: 'The name of the habit', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the habit', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The frequency of the habit', required: true })
  @IsString()
  @IsNotEmpty()
  frequency: string;

  // Optionally, the userId can be added if this is to associate a habit with a specific user
  // @ApiProperty({ description: 'The user ID to associate the habit with', required: true })
  // userId: number; // Uncomment if userId should be part of this DTO
}
