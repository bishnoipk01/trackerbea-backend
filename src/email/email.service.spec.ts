import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { WinstonModule } from 'nest-winston';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, WinstonModule],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
