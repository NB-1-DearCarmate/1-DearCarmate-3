import { Car } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import { PagePaginationParams } from '../types/pagination';

export async function createCar(data: Omit<Car, 'id' | 'type' | 'status'>) {
  const createdCar = await prismaClient.car.create({
    data: {
      ...data,
      type: '세단 | 경차 | SUV',
      status: 'possession',
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

  const where = {
    ...baseWhere,
    ...(status ? { status } : {}),
  };

  const totalItemCount = await prismaClient.car.count({
    where,
  });

  const cars = await prismaClient.car.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
  });

  const mappedCars = cars.map((car) => ({
    id: car.id,
    carNumber: car.carNumber,
    manufacturer: car.manufacturer,
    model: car.model,
    type: car.type,
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

export async function getCarModelList() {
  const cars = await prismaClient.car.findMany({
    select: {
      manufacturer: true,
      model: true,
    },
  });

  const manufacturerMap: { [manufacturer: string]: string[] } = {};

  cars.forEach((car) => {
    if (!manufacturerMap[car.manufacturer]) {
      manufacturerMap[car.manufacturer] = [];
    }
    if (!manufacturerMap[car.manufacturer].includes(car.model)) {
      manufacturerMap[car.manufacturer].push(car.model);
    }
  });

  const result = Object.entries(manufacturerMap).map(([manufacturer, models]) => ({
    manufacturer,
    model: models,
  }));

  return { data: result };
}
