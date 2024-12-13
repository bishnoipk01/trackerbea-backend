import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The full name of the user.',
    example: 'John Doe',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'johndoe@example.com',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Password for the user account.',
    example: 'password123',
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;
}
