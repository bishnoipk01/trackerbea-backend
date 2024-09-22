import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserProfileDto } from '../users/dto/create-user-profile.dto';
import { UpdateUserProfileDto } from '../users/dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(
    userId: number,
    createUserProfileDto: CreateUserProfileDto,
  ) {
    console.log(userId);
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...createUserProfileDto,
      },
    });
  }

  async updateProfile(
    userId: number,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...updateUserProfileDto,
      },
    });
  }

  async getProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
