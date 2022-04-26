/*
  Warnings:

  - You are about to drop the column `canceledAt` on the `enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "enrollment" DROP COLUMN "canceledAt",
ADD COLUMN     "cancelledAt" TIMESTAMP(3);
