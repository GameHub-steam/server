/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "phoneNumber";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "senderId";
