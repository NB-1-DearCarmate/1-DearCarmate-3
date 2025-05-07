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
