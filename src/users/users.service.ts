import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    const data = this.prisma.user.findFirst({ where: { id } });
    return data;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const data = this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return data;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    if (user) return user;
    throw new HttpException(
      `User with ID ${id} not found or cannot be deleted`,
      HttpStatus.NOT_FOUND,
    );
  }

  // Method to find a user by email
  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
