import { Manufacturer } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';

export async function getManufacturerByName(name: string) {
  const manufacturer = await prismaClient.manufacturer.findUnique({
    where: {
      name,
    },
  });
  return manufacturer;
}

export async function getManufacturerById(id: number) {
  const manufacturer = await prismaClient.manufacturer.findUnique({
    where: {
      id,
    },
  });
  return manufacturer;
}

export async function getManufacturerList() {
  const manufacturers = await prismaClient.manufacturer.findMany({
    include: {
      carModels: {
        select: { model: true },
      },
    },
  });

  const result = manufacturers
    .filter((manufacturer) => manufacturer.carModels.length > 0)
    .map((manufacturer) => ({
      manufacturer: manufacturer.name,
      model: manufacturer.carModels.map((carModel) => carModel.model),
    }));

  return { data: result };
}
