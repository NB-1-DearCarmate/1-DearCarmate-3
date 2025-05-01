import { CarType } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';

export async function getCarTypeById(id: number) {
  const carsType = await prismaClient.carType.findUnique({
    where: {
      id,
    },
  });
  return carsType;
}
