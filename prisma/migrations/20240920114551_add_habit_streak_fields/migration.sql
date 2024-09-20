/*
  Warnings:

  - You are about to drop the column `lastCompleted` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `streak` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "lastCompleted",
DROP COLUMN "streak",
ALTER COLUMN "description" DROP NOT NULL;
