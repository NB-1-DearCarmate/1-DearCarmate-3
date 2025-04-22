/*
  Warnings:

  - You are about to drop the `CAR` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CARMODEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CARTYPE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `COMPANY` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CONTRACT` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CONTRACTDOCUMENT` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CUSTOMER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MANUFACTURER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MEETING` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USER` table. If the table is not empty, all the data it contains will be lost.

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

-- DropTable
DROP TABLE "CAR";

-- DropTable
DROP TABLE "CARMODEL";

-- DropTable
DROP TABLE "CARTYPE";

-- DropTable
DROP TABLE "COMPANY";

-- DropTable
DROP TABLE "CONTRACT";

-- DropTable
DROP TABLE "CONTRACTDOCUMENT";

-- DropTable
DROP TABLE "CUSTOMER";

-- DropTable
DROP TABLE "MANUFACTURER";

-- DropTable
DROP TABLE "MEETING";

-- DropTable
DROP TABLE "USER";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "encryptPassword" VARCHAR(100) NOT NULL,
    "role" "USER_ROLE" NOT NULL,
    "user_code" VARCHAR(50) NOT NULL,
    "imageUrl" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "ageGroup" INTEGER,
    "region" VARCHAR(50),
    "contractCount" INTEGER NOT NULL DEFAULT 0,
    "memo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "carNumber" VARCHAR(50) NOT NULL,
    "manufacturingYear" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "price" DECIMAL(20,2) NOT NULL,
    "status" "CAR_STATUS" NOT NULL DEFAULT 'AVAILABLE',
    "accidentCount" INTEGER NOT NULL DEFAULT 0,
    "explanation" TEXT,
    "accidentDetails" TEXT,
    "Datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "CONTRACT_STATUS" NOT NULL,
    "contractPrice" DECIMAL(20,2) NOT NULL,
    "resolutionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractDocument" (
    "id" SERIAL NOT NULL,
    "fileName" VARCHAR(50) NOT NULL,
    "filePath" VARCHAR(255) NOT NULL,
    "fileSize" INTEGER,
    "contractId" INTEGER NOT NULL,

    CONSTRAINT "ContractDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarType" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "CarType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModel" (
    "id" SERIAL NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "manufacturerId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "contractId" INTEGER NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR(50) NOT NULL,
    "companyCode" VARCHAR(50) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phoneNumber_key" ON "Customer"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Car_carNumber_key" ON "Car"("carNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_name_key" ON "Manufacturer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CarType_type_key" ON "CarType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyCode_key" ON "Company"("companyCode");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractDocument" ADD CONSTRAINT "ContractDocument_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CarType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
