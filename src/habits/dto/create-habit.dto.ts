import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;

  // The userId will be passed to associate this habit with a user
}
