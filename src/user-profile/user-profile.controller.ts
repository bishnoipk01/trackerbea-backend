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
import { CreateUserProfileDto } from 'src/users/dto/create-user-profile.dto';
import { UpdateUserProfileDto } from 'src/users/dto/update-user-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  createProfile(
    @Body() createUserProfileDto: CreateUserProfileDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return this.userProfileService.createProfile(userId, createUserProfileDto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateProfile(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @Req() req: any,
  ) {
    const UserId = req.user.UserId;
    return this.userProfileService.updateProfile(UserId, updateUserProfileDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() req: any) {
    const UserId = req.user.UserId;
    return this.userProfileService.getProfile(UserId);
  }
}
