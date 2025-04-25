/*
  Warnings:

  - A unique constraint covering the columns `[companyName]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ageGroup` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AGE_GROUP" AS ENUM ('AGE_10', 'AGE_20', 'AGE_30', 'AGE_40', 'AGE_50', 'AGE_60', 'AGE_70', 'AGE_80');

-- CreateEnum
CREATE TYPE "REGION" AS ENUM ('SEOUL', 'GYEONGGI', 'INCHEON', 'GANGWON', 'CHOUNGBUK', 'CHOUNGNAM', 'SEJONG', 'DAJEON', 'GYEONGBUK', 'GYEONGNAM', 'GWANGJU', 'JEONBUK', 'JEONNAM', 'DAEGU', 'ULSAN', 'BUSAN', 'JEJU');

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "ageGroup",
ADD COLUMN     "ageGroup" "AGE_GROUP" NOT NULL,
DROP COLUMN "region",
ADD COLUMN     "region" "REGION" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyName_key" ON "Company"("companyName");
