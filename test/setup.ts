import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: '.env.test' }); // Load the test environment variables

const prisma = new PrismaClient();

module.exports = async () => {
  try {
    // Run migrations to ensure the schema is up to date
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });

    // Close the Prisma connection
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error setting up test database:', error);
    process.exit(1); // Exit if setup fails
  }
};
