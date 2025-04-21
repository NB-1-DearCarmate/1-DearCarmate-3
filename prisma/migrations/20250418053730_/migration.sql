-- CreateEnum
CREATE TYPE "CONTRACT_STATUS" AS ENUM ('VEHICLE_CHECKING', 'PRICE_CHECKING', 'CONTRACT_PREPARING', 'CONTRACT_SUCCESS', 'CONTRACT_FAILED');

-- CreateEnum
CREATE TYPE "CAR_STATUS" AS ENUM ('AVAILABLE', 'PENDING', 'SOLD');

-- CreateTable
CREATE TABLE "USER" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_id" TEXT NOT NULL,
    "usercode_id" TEXT NOT NULL,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CUSTOMER" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "age_group" INTEGER,
    "region" VARCHAR(50),
    "contract_count" INTEGER NOT NULL DEFAULT 0,
    "memo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "CUSTOMER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CAR" (
    "id" TEXT NOT NULL,
    "car_number" VARCHAR(50) NOT NULL,
    "manufactuuing_year" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "price" DECIMAL(20,2) NOT NULL,
    "status" "CAR_STATUS" NOT NULL DEFAULT 'AVAILABLE',
    "accident_count" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT,
    "accident_detail" TEXT,
    "Datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_id" TEXT NOT NULL,
    "car_model_id" TEXT NOT NULL,

    CONSTRAINT "CAR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CONTRACT" (
    "id" TEXT NOT NULL,
    "status" "CONTRACT_STATUS" NOT NULL,
    "finalized_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "CONTRACT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CONTRACTDOCUMENT" (
    "id" TEXT NOT NULL,
    "file_name" VARCHAR(50) NOT NULL,
    "file_path" VARCHAR(255) NOT NULL,
    "file_size" INTEGER,
    "contract_id" TEXT NOT NULL,

    CONSTRAINT "CONTRACTDOCUMENT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MANUFACTURER" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "MANUFACTURER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CARTYPE" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "CARTYPE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CARMODEL" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "manufacturer_id" TEXT NOT NULL,
    "car_type_id" TEXT NOT NULL,

    CONSTRAINT "CARMODEL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MEETING" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "contract_id" TEXT NOT NULL,

    CONSTRAINT "MEETING_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "COMPANY" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "code" VARCHAR(50) NOT NULL,

    CONSTRAINT "COMPANY_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USERCODE" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "USERCODE_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");

-- CreateIndex
CREATE UNIQUE INDEX "USER_phone_number_key" ON "USER"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "USER_usercode_id_key" ON "USER"("usercode_id");

-- CreateIndex
CREATE UNIQUE INDEX "CUSTOMER_email_key" ON "CUSTOMER"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CUSTOMER_phone_number_key" ON "CUSTOMER"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "CAR_car_number_key" ON "CAR"("car_number");

-- CreateIndex
CREATE UNIQUE INDEX "MANUFACTURER_name_key" ON "MANUFACTURER"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CARTYPE_name_key" ON "CARTYPE"("name");

-- CreateIndex
CREATE UNIQUE INDEX "COMPANY_code_key" ON "COMPANY"("code");

-- CreateIndex
CREATE UNIQUE INDEX "USERCODE_code_key" ON "USERCODE"("code");

-- AddForeignKey
ALTER TABLE "USER" ADD CONSTRAINT "USER_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "COMPANY"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USER" ADD CONSTRAINT "USER_usercode_id_fkey" FOREIGN KEY ("usercode_id") REFERENCES "USERCODE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "USERCODE" ADD CONSTRAINT "USERCODE_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "COMPANY"("id") ON DELETE CASCADE ON UPDATE CASCADE;
