/*
  Warnings:

  - You are about to drop the column `usercode_id` on the `USER` table. All the data in the column will be lost.
  - You are about to drop the `USERCODE` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `USER` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_code` to the `USER` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'OWNER', 'EMPLOYEE');

-- DropForeignKey
ALTER TABLE "USER" DROP CONSTRAINT "USER_usercode_id_fkey";

-- DropForeignKey
ALTER TABLE "USERCODE" DROP CONSTRAINT "USERCODE_company_id_fkey";

-- DropIndex
DROP INDEX "USER_usercode_id_key";

-- AlterTable
ALTER TABLE "USER" DROP COLUMN "usercode_id",
ADD COLUMN     "role" "USER_ROLE" NOT NULL,
ADD COLUMN     "user_code" VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE "USERCODE";
