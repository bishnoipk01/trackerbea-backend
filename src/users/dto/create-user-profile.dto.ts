import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProfileDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
    type: String,
    required: false, // Making it optional based on @IsOptional
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: "URL of the user's profile picture",
    example: 'https://example.com/profile.jpg',
    type: String,
    required: false, // Making it optional based on @IsOptional
  })
  @IsString()
  @IsOptional()
  profilePictureUrl?: string;

  @ApiProperty({
    description: 'A brief biography of the user',
    example: 'Hello, I am John Doe, a software developer.',
    type: String,
    required: false, // Making it optional based on @IsOptional
  })
  @IsString()
  @IsOptional()
  bio?: string;
}
