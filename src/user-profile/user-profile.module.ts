import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [],
  providers: [PrismaService, UserProfileService],
  controllers: [UserProfileController],
})
export class UserProfileModule {}
