import { PrismaClient } from '@prisma/client';
import { COMPANY, USER, CUSTOMER, CAR, CONTRACT, MEETING, CONTRACTDOCUMENT } from './mock.mjs';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.car.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.contractDocument.deleteMany();

  // COMPANY 데이터 생성
  await prisma.company.createMany({
    data: COMPANY,
    skipDuplicates: true,
  });

  // CAR 데이터 생성
  await prisma.car.createMany({
    data: CAR,
    skipDuplicates: true,
  });

  // USER 데이터 생성
  await prisma.user.createMany({
    data: USER,
    skipDuplicates: true,
  });

  // CUSTOMER 데이터 생성
  await prisma.customer.createMany({
    data: CUSTOMER,
    skipDuplicates: true,
  });

  // CONTRACT 데이터 생성
  await prisma.contract.createMany({
    data: CONTRACT,
    skipDuplicates: true,
  });

  // MEETING 데이터 생성
  await prisma.meeting.createMany({
    data: MEETING,
    skipDuplicates: true,
  });

  await prisma.contractDocument.createMany({
    data: CONTRACTDOCUMENT,
    skipDuplicates: true,
  });

  await prisma.$executeRawUnsafe(
    `SELECT setVal('"Company_id_seq"', (SELECT MAX(id) FROM "Company"));`,
  );
  await prisma.$executeRawUnsafe(`SELECT setVal('"User_id_seq"', (SELECT MAX(id) FROM "User"));`);
  await prisma.$executeRawUnsafe(
    `SELECT setVal('"Customer_id_seq"', (SELECT MAX(id) FROM "Customer"));`,
  );
  await prisma.$executeRawUnsafe(`SELECT setVal('"Car_id_seq"', (SELECT MAX(id) FROM "Car"));`);
  await prisma.$executeRawUnsafe(
    `SELECT setVal('"Contract_id_seq"', (SELECT MAX(id) FROM "Contract"));`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setVal('"Meeting_id_seq"', (SELECT MAX(id) FROM "Meeting"));`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setVal('"ContractDocument_id_seq"', (SELECT MAX(id) FROM "ContractDocument"));`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
