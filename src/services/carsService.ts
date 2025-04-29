import NoFoundError from '../lib/errors/NoFoundError';
import NotFoundError from '../lib/errors/NotFoundError';
import * as carsRepository from '../repositories/carsRepository';
import Car from '../types/Car';
import { PagePaginationParams, PagePaginationResult } from '../types/pagination';

type CreateCarData = Omit<Car, 'id' | 'type' | 'status'>;
type GetCarListInfo = Omit<Car, 'companyId'>;
type UpdateCarData = Partial<CreateCarData>;

export async function createCar(data: CreateCarData): Promise<Car> {
  const createdCar = await carsRepository.createCar(data);
  return createdCar;
}

export async function getCarList(
  params: PagePaginationParams,
): Promise<PagePaginationResult<GetCarListInfo>> {
  const cars = await carsRepository.getCarList(params);
  return cars;
}

export async function updateCar(id: number, data: UpdateCarData): Promise<Car> {
  const updatedCar = await carsRepository.updateCar(id, data);
  return updatedCar;
}

export async function deleteCar(id: number): Promise<void> {
  await carsRepository.deleteCar(id);
}

export async function getCar(id: number): Promise<Car> {
  const car = await carsRepository.getCar(id);
  if (!car) {
    throw new NoFoundError('존재하지 않는 차량입니다.');
  }
  return car;
}

export async function getCarModelList() {
  const carModels = await carsRepository.getCarModelList();
  return carModels;
}
