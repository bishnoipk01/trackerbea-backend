/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

class LoginDto {
  @ApiProperty({ description: 'Email of the user', required: true })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Password', required: true })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Endpoint to login into the application' })
  @ApiResponse({ status: 200, description: 'Logged in successfully!' })
  @ApiResponse({ status: 401, description: 'Invalid Credentials!' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT for the validated user
    const token = await this.authService.login(user);
    // Remove sensitive data (like password) from the response
    const { password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, token };
  }

  @ApiOperation({ summary: 'Endpoint to signup to the application' })
  @ApiResponse({ status: 200, description: 'User created successfully!' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signup(createUserDto);

    // Generate JWT for the new user
    const token = await this.authService.login(user);
    // Remove sensitive data (like password) from the response
    const { password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, token };
  }
}
