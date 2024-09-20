-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "lastCompleted" TIMESTAMP(3),
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;
