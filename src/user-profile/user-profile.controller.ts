import {
  Body,
  Controller,
  Patch,
  Post,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from '../users/dto/create-user-profile.dto';
import { UpdateUserProfileDto } from '../users/dto/update-user-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('User Profile')
@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a user profile',
    description: 'Creates a new user profile with the provided details.',
  })
  @ApiResponse({
    status: 201,
    description: 'User profile created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, validation failed.',
  })
  createProfile(
    @Body() createUserProfileDto: CreateUserProfileDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId; // Ensure userId is lowercase here
    return this.userProfileService.createProfile(userId, createUserProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({
    summary: 'Update user profile',
    description: 'Updates the user profile with the provided details.',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, validation failed.',
  })
  updateProfile(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId; // Ensure userId is lowercase here
    return this.userProfileService.updateProfile(userId, updateUserProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Get user profile',
    description:
      'Retrieves the user profile associated with the logged-in user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user profile.',
  })
  @ApiResponse({
    status: 404,
    description: 'User profile not found.',
  })
  getProfile(@Req() req: any) {
    const userId = req.user.userId; // Ensure userId is lowercase here
    return this.userProfileService.getProfile(userId);
  }
}
