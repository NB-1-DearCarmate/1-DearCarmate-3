import { Car, CAR_STATUS } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import { PagePaginationParams } from '../types/pagination';
import { buildSearchCondition } from '../lib/searchCondition';

export async function createCar(data: Omit<Car, 'id' | 'status'>) {
  return await prismaClient.car.create({
    data: {
      ...data,
      status: CAR_STATUS.AVAILABLE,
    },
  });
}

export async function getCarList({
  page,
  pageSize,
  status,
  searchBy,
  keyword,
}: PagePaginationParams) {
  const searchCondition = buildSearchCondition({ page, pageSize, searchBy, keyword }, [
    'carNumber',
    'model',
  ]);

  const dbStatus =
    status === 'possession'
      ? CAR_STATUS.AVAILABLE
      : status === 'contractProceeding'
        ? CAR_STATUS.PENDING
        : status === 'contractCompleted'
          ? CAR_STATUS.SOLD
          : undefined;

  const where = {
    ...searchCondition.whereCondition,
    ...(dbStatus ? { status: dbStatus } : {}),
  };

  const totalItemCount = await prismaClient.car.count({
    where,
  });

  const cars = await prismaClient.car.findMany({
    ...searchCondition.pageCondition,
    where,
    include: {
      carModel: {
        include: {
          carType: true,
          manufacturer: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const mappedCars = cars.map((car) => ({
    id: car.id,
    carNumber: car.carNumber,
    manufacturer: car.carModel.manufacturer.name,
    model: car.carModel.model,
    type: car.carModel.carType.type,
    manufacturingYear: car.manufacturingYear,
    mileage: car.mileage,
    price: car.price,
    accidentCount: car.accidentCount,
    explanation: car.explanation ?? undefined,
    accidentDetails: car.accidentDetails ?? undefined,
    status: car.status,
  }));

  return {
    totalItemCount,
    mappedCars,
  };
}

export async function updateCar(id: number, data: Partial<Car>) {
  return await prismaClient.car.update({
    where: { id },
    data,
  });
}

export async function deleteCar(id: number) {
  return prismaClient.car.delete({
    where: { id },
  });
}

export async function getCar(id: number) {
  return await prismaClient.car.findUnique({
    where: { id },
  });
}

export async function createCars(dataList: Omit<Car, 'id' | 'status'>[]) {
  const createdCars = await prismaClient.$transaction(async (prisma) => {
    const cars = await Promise.all(
      dataList.map((data) =>
        prisma.car.create({
          data: {
            ...data,
            status: CAR_STATUS.AVAILABLE,
          },
        }),
      ),
    );
    return cars;
  });

  return createdCars;
}
