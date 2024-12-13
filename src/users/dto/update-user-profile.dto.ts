import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserProfileDto } from './create-user-profile.dto';

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe_updated',
    required: false,
  })
  username?: string;

  @ApiProperty({
    description: "URL of the user's updated profile picture",
    example: 'https://example.com/profile_updated.jpg',
    required: false,
  })
  profilePictureUrl?: string;

  @ApiProperty({
    description: 'A brief updated biography of the user',
    example:
      'Hello, I am John Doe, a software developer with a passion for coding.',
    required: false,
  })
  bio?: string;
}
