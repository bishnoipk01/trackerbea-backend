// test/teardown.ts
import { PrismaService } from '../src/prisma/prisma.service';

// Manually create an instance of PrismaService
const prisma = new PrismaService();

export default async () => {
  // Disconnect from the database
  await prisma.$disconnect();
};
