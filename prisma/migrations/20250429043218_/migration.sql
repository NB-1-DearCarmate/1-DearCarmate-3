/*
  Warnings:

  - You are about to drop the column `Datetime` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `Car` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Integer`.
  - You are about to drop the `CarModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manufacturer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `manufacturer` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `explanation` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accidentDetails` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_modelId_fkey";

-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_manufacturerId_fkey";

-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_typeId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "Datetime",
DROP COLUMN "modelId",
ADD COLUMN     "manufacturer" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "carNumber" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "accidentCount" DROP DEFAULT,
ALTER COLUMN "explanation" SET NOT NULL,
ALTER COLUMN "accidentDetails" SET NOT NULL;

-- DropTable
DROP TABLE "CarModel";

-- DropTable
DROP TABLE "CarType";

-- DropTable
DROP TABLE "Manufacturer";

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
