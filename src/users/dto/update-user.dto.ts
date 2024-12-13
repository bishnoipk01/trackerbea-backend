import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The full name of the user.',
    example: 'John Doe',
    required: false, // Optional field
  })
  name?: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'johndoe@example.com',
    required: false, // Optional field
  })
  email?: string;

  @ApiProperty({
    description: 'Password for the user account.',
    example: 'password123',
    required: false, // Optional field
  })
  password?: string;
}
