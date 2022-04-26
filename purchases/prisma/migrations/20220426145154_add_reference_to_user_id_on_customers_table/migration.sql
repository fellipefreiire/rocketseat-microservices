/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "customer_authUserId_key" ON "customer"("authUserId");
