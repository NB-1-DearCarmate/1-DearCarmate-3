import { PrismaClient } from '@prisma/client';
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

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.car.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.meeting.deleteMany();
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
