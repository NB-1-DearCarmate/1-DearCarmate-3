/*
  Warnings:

  - You are about to drop the column `encryptPassword` on the `User` table. All the data in the column will be lost.
  - Added the required column `encryptedPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "encryptPassword",
ADD COLUMN     "encryptedPassword" VARCHAR(100) NOT NULL;
