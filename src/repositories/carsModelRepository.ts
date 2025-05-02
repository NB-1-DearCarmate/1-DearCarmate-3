import { prismaClient } from '../lib/prismaClient';

export async function getCarModelByModel(model: string, manufacturerId: number) {
  return await prismaClient.carModel.findFirst({
    where: {
      model,
      manufacturerId,
    },
  });
}

export async function getCarModelById(id: number) {
  return await prismaClient.carModel.findUnique({
    where: {
      id,
    },
  });
}
