import { IsString, IsOptional } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  profilePictureUrl?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
