import { Car, CAR_STATUS } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import { PagePaginationParams } from '../types/pagination';

export async function createCar(data: Omit<Car, 'id' | 'status'>) {
  const createdCar = await prismaClient.car.create({
    data: {
      ...data,
      status: 'AVAILABLE',
    },
  });
  return createdCar;
}

export async function getCarList({
  page,
  pageSize,
  status,
  searchBy,
  keyword,
}: PagePaginationParams) {
  const baseWhere =
    searchBy === 'carNumber'
      ? { carNumber: { contains: keyword } }
      : searchBy === 'model'
        ? { model: { contains: keyword } }
        : {};

  const dbStatus =
    status === 'possession'
      ? CAR_STATUS.AVAILABLE
      : status === 'contractProceeding'
        ? CAR_STATUS.PENDING
        : status === 'contractCompleted'
          ? CAR_STATUS.SOLD
          : status;

  const where = {
    ...baseWhere,
    ...(dbStatus ? { status: dbStatus } : {}),
  };

  const totalItemCount = await prismaClient.car.count({
    where,
  });

  const cars = await prismaClient.car.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
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
    explanation: car.explanation,
    accidentDetails: car.accidentDetails,
    status: car.status,
  }));

  return {
    currentPage: page,
    totalPages: Math.ceil(totalItemCount / pageSize),
    totalItemCount,
    data: mappedCars,
  };
}

export async function updateCar(id: number, data: Partial<Car>) {
  const updatedCar = await prismaClient.car.update({
    where: { id },
    data,
  });
  return updatedCar;
}

export async function deleteCar(id: number) {
  return prismaClient.car.delete({
    where: { id },
  });
}

export async function getCar(id: number) {
  const car = await prismaClient.car.findUnique({
    where: { id },
  });
  return car;
}
