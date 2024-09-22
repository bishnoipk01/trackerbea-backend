// test/setup.ts
import { PrismaService } from '../src/prisma/prisma.service';

// Manually create an instance of PrismaService
const prisma = new PrismaService();

export default async () => {
  // Connect to the database
  await prisma.$connect();
};
