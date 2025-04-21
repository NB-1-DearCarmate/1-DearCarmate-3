-- CreateTable
CREATE TABLE "OWNER" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "OWNER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ADMIN" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "ADMIN_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OWNER_email_key" ON "OWNER"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ADMIN_email_key" ON "ADMIN"("email");

-- AddForeignKey
ALTER TABLE "OWNER" ADD CONSTRAINT "OWNER_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "COMPANY"("id") ON DELETE CASCADE ON UPDATE CASCADE;
