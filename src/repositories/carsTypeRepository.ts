import { prismaClient } from '../lib/prismaClient';

export async function getCarTypeById(id: number) {
  return await prismaClient.carType.findUnique({
    where: {
      id,
    },
  });
}
