import { IsInt, Min, Max, IsString, IsOptional } from 'class-validator';

export class UpdateTaskProgressDto {
  @IsInt()
  @Min(0)
  @Max(100)
  progress: number; // The progress percentage (0 - 100)

  @IsString()
  @IsOptional()
  status?: string; // Optional status update (e.g., "in-progress", "completed")
}
