/*
  Warnings:

  - You are about to drop the column `created_at` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `user_code` on the `User` table. All the data in the column will be lost.
  - Added the required column `employeeNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_code",
ADD COLUMN     "employeeNumber" VARCHAR(50) NOT NULL;
