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
} from './mock.js';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.cOMPANY.deleteMany();
  await prisma.uSER.deleteMany();
  await prisma.cUSTOMER.deleteMany();
  await prisma.cAR.deleteMany();
  await prisma.cONTRACT.deleteMany();
  await prisma.mEETING.deleteMany();
  await prisma.cARMODEL.deleteMany();
  await prisma.mANUFACTURER.deleteMany();
  await prisma.cARTYPE.deleteMany();
  await prisma.cONTRACTDOCUMENT.deleteMany();

  // MANUFACTURER 데이터 생성
  await prisma.mANUFACTURER.createMany({
    data: MANUFACTURER,
    skipDuplicates: true,
  });

  // CARTYPE 데이터 생성
  await prisma.cARTYPE.createMany({
    data: CARTYPE,
    skipDuplicates: true,
  });

  // CARMODEL 데이터 생성
  await prisma.cARMODEL.createMany({
    data: CARMODEL,
    skipDuplicates: true,
  });

  // COMPANY 데이터 생성
  await prisma.cOMPANY.createMany({
    data: COMPANY,
    skipDuplicates: true,
  });

  // CAR 데이터 생성
  await prisma.cAR.createMany({
    data: CAR,
    skipDuplicates: true,
  });

  // USER 데이터 생성
  await prisma.uSER.createMany({
    data: USER,
    skipDuplicates: true,
  });

  // CUSTOMER 데이터 생성
  await prisma.cUSTOMER.createMany({
    data: CUSTOMER,
    skipDuplicates: true,
  });

  // CONTRACT 데이터 생성
  await prisma.cONTRACT.createMany({
    data: CONTRACT,
    skipDuplicates: true,
  });

  // MEETING 데이터 생성
  await prisma.mEETING.createMany({
    data: MEETING,
    skipDuplicates: true,
  });

  await prisma.cONTRACTDOCUMENT.createMany({
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
