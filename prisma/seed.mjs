import { PrismaClient } from '@prisma/client';
<<<<<<< HEAD
import { COMPANY, USER, CUSTOMER, CAR, CONTRACT, MEETING, CONTRACTDOCUMENT } from './mock.mjs';
=======
import {
  COMPANY,
  USER,
  CUSTOMER,
  CAR,
  CONTRACT,
  MEETING,
  MANUFACTURER,
  CARTYPE,
  CARMODEL,
  CONTRACTDOCUMENT,
} from './mock.mjs';
>>>>>>> 96a8d3c5885b743b4ab3439251462527fd6988f6

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.car.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.meeting.deleteMany();
<<<<<<< HEAD
  await prisma.contractDocument.deleteMany();

=======
  await prisma.carModel.deleteMany();
  await prisma.manufacturer.deleteMany();
  await prisma.carType.deleteMany();
  await prisma.contractDocument.deleteMany();

  // MANUFACTURER 데이터 생성
  await prisma.manufacturer.createMany({
    data: MANUFACTURER,
    skipDuplicates: true,
  });

  // CARTYPE 데이터 생성
  await prisma.carType.createMany({
    data: CARTYPE,
    skipDuplicates: true,
  });

  // CARMODEL 데이터 생성
  await prisma.carModel.createMany({
    data: CARMODEL,
    skipDuplicates: true,
  });

>>>>>>> 96a8d3c5885b743b4ab3439251462527fd6988f6
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
<<<<<<< HEAD
=======
    `SELECT setVal('"CarModel_id_seq"', (SELECT MAX(id) FROM "CarModel"));`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setVal('"Manufacturer_id_seq"', (SELECT MAX(id) FROM "Manufacturer"));`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setVal('"CarType_id_seq"', (SELECT MAX(id) FROM "CarType"));`,
  );
  await prisma.$executeRawUnsafe(
>>>>>>> 96a8d3c5885b743b4ab3439251462527fd6988f6
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
