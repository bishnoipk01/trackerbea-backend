import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { HabitsModule } from './habits/habits.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TasksModule } from './tasks/tasks.module';
import { EmailService } from './email/email.service';
import { LoggerModule } from './logger/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserProfileService } from './user-profile/user-profile.service';
import { UserProfileController } from './user-profile/user-profile.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './utils/logging.interceptor';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    HabitsModule,
    AuthModule,
    PassportModule,
    ScheduleModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    TasksModule,
    LoggerModule,
  ],
  controllers: [AppController, UserProfileController],
  providers: [
    AppService,
    PrismaService,
    EmailService,
    UserProfileService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
