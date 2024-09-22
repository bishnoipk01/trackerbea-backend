import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileController } from './user-profile.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfileService } from './user-profile.service';

describe('UserProfileController', () => {
  let controller: UserProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [UserProfileService, PrismaService],
    }).compile();

    controller = module.get<UserProfileController>(UserProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
