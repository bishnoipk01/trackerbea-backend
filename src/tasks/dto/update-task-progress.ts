import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsString, IsOptional } from 'class-validator';

export class UpdateTaskProgressDto {
  @ApiProperty({
    description: 'Task progress as a percentage (0 - 100)',
    required: true,
    example: 50, // Example to show what values are valid
  })
  @IsInt()
  @Min(0)
  @Max(100)
  progress: number; // The progress percentage (0 - 100)

  @ApiProperty({
    description: 'Task status update (e.g., "in-progress", "completed")',
    required: false,
    example: 'in-progress', // Example status value
  })
  @IsString()
  @IsOptional()
  status?: string; // Optional status update (e.g., "in-progress", "completed")
}
