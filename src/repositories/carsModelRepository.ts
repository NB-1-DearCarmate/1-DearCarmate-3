import { CarModel } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';

export async function getCarModelByModel(model: string, manufacturerId: number) {
  const carModel = await prismaClient.carModel.findFirst({
    where: {
      model,
      manufacturerId,
    },
  });
  return carModel;
}

export async function getCarModelById(id: number) {
  const carModel = await prismaClient.carModel.findUnique({
    where: {
      id,
    },
  });
  return carModel;
}
