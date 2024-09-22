import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileService } from './user-profile.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UserProfileService', () => {
  let service: UserProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProfileService, PrismaService],
    }).compile();

    service = module.get<UserProfileService>(UserProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
