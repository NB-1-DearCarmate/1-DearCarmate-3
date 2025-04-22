/*
  Warnings:

  - The primary key for the `CAR` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CAR` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CARMODEL` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CARMODEL` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CARTYPE` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CARTYPE` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `COMPANY` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `COMPANY` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CONTRACT` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CONTRACT` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CONTRACTDOCUMENT` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CONTRACTDOCUMENT` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CUSTOMER` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CUSTOMER` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `MANUFACTURER` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MANUFACTURER` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `MEETING` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MEETING` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `USER` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `USER` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `company_id` on the `CAR` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `car_model_id` on the `CAR` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `manufacturer_id` on the `CARMODEL` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `car_type_id` on the `CARMODEL` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `customer_id` on the `CONTRACT` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `car_id` on the `CONTRACT` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `CONTRACT` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contract_id` on the `CONTRACTDOCUMENT` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `CUSTOMER` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contract_id` on the `MEETING` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `USER` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CAR" DROP CONSTRAINT "CAR_car_model_id_fkey";

-- DropForeignKey
ALTER TABLE "CAR" DROP CONSTRAINT "CAR_company_id_fkey";

-- DropForeignKey
ALTER TABLE "CARMODEL" DROP CONSTRAINT "CARMODEL_car_type_id_fkey";

-- DropForeignKey
ALTER TABLE "CARMODEL" DROP CONSTRAINT "CARMODEL_manufacturer_id_fkey";

-- DropForeignKey
ALTER TABLE "CONTRACT" DROP CONSTRAINT "CONTRACT_car_id_fkey";

-- DropForeignKey
ALTER TABLE "CONTRACT" DROP CONSTRAINT "CONTRACT_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "CONTRACT" DROP CONSTRAINT "CONTRACT_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CONTRACTDOCUMENT" DROP CONSTRAINT "CONTRACTDOCUMENT_contract_id_fkey";

-- DropForeignKey
ALTER TABLE "CUSTOMER" DROP CONSTRAINT "CUSTOMER_company_id_fkey";

-- DropForeignKey
ALTER TABLE "MEETING" DROP CONSTRAINT "MEETING_contract_id_fkey";

-- DropForeignKey
ALTER TABLE "USER" DROP CONSTRAINT "USER_company_id_fkey";

-- AlterTable
ALTER TABLE "CAR" DROP CONSTRAINT "CAR_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
DROP COLUMN "car_model_id",
ADD COLUMN     "car_model_id" INTEGER NOT NULL,
ADD CONSTRAINT "CAR_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CARMODEL" DROP CONSTRAINT "CARMODEL_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "manufacturer_id",
ADD COLUMN     "manufacturer_id" INTEGER NOT NULL,
DROP COLUMN "car_type_id",
ADD COLUMN     "car_type_id" INTEGER NOT NULL,
ADD CONSTRAINT "CARMODEL_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CARTYPE" DROP CONSTRAINT "CARTYPE_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CARTYPE_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "COMPANY" DROP CONSTRAINT "COMPANY_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "COMPANY_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CONTRACT" DROP CONSTRAINT "CONTRACT_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
DROP COLUMN "car_id",
ADD COLUMN     "car_id" INTEGER NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "CONTRACT_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CONTRACTDOCUMENT" DROP CONSTRAINT "CONTRACTDOCUMENT_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "contract_id",
ADD COLUMN     "contract_id" INTEGER NOT NULL,
ADD CONSTRAINT "CONTRACTDOCUMENT_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CUSTOMER" DROP CONSTRAINT "CUSTOMER_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD CONSTRAINT "CUSTOMER_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MANUFACTURER" DROP CONSTRAINT "MANUFACTURER_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MANUFACTURER_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MEETING" DROP CONSTRAINT "MEETING_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "contract_id",
ADD COLUMN     "contract_id" INTEGER NOT NULL,
ADD CONSTRAINT "MEETING_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "USER" DROP CONSTRAINT "USER_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD CONSTRAINT "USER_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "USER" ADD CONSTRAINT "USER_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "COMPANY"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CUSTOMER" ADD CONSTRAINT "CUSTOMER_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "COMPANY"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CAR" ADD CONSTRAINT "CAR_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "COMPANY"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CAR" ADD CONSTRAINT "CAR_car_model_id_fkey" FOREIGN KEY ("car_model_id") REFERENCES "CARMODEL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CONTRACT" ADD CONSTRAINT "CONTRACT_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "CUSTOMER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CONTRACT" ADD CONSTRAINT "CONTRACT_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "CAR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CONTRACT" ADD CONSTRAINT "CONTRACT_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CONTRACTDOCUMENT" ADD CONSTRAINT "CONTRACTDOCUMENT_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "CONTRACT"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CARMODEL" ADD CONSTRAINT "CARMODEL_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "MANUFACTURER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CARMODEL" ADD CONSTRAINT "CARMODEL_car_type_id_fkey" FOREIGN KEY ("car_type_id") REFERENCES "CARTYPE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MEETING" ADD CONSTRAINT "MEETING_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "CONTRACT"("id") ON DELETE CASCADE ON UPDATE CASCADE;
