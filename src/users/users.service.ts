import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const data = this.prisma.user.create({ data: createUserDto });
    return data;
  }

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
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Handle error or throw custom exception
      throw new Error(`User with ID ${id} not found or cannot be deleted`);
    }
  }

  // Method to find a user by email
  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Method to validate a user (you might need to adjust this based on your needs)
  async validateUser(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (user && user.password === password) {
      // Replace with proper password comparison
      return user;
    }
    return null;
  }
}
