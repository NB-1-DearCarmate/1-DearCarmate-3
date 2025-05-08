import { prismaClient } from '../lib/prismaClient';

export async function getManufacturerByName(name: string) {
  return await prismaClient.manufacturer.findUnique({
    where: {
      name,
    },
  });
}

export async function getManufacturerById(id: number) {
  return await prismaClient.manufacturer.findUnique({
    where: {
      id,
    },
  });
}

export async function getManufacturerList() {
  return await prismaClient.manufacturer.findMany({
    include: {
      carModels: {
        select: { model: true },
      },
    },
  });
}
