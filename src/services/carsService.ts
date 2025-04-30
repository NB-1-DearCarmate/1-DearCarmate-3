import BadRequestError from '../lib/errors/BadRequestError';
import * as carsRepository from '../repositories/carsRepository';
import * as manufacturerRepository from '../repositories/manufacturerRepository';
import * as carsModelRepository from '../repositories/carsModelRepository';
import * as carsTypeRepository from '../repositories/carsTypeRepository';
import Car from '../types/Car';
import CarInfo from '../types/CarInfo';
import { PagePaginationParams, PagePaginationResult } from '../types/pagination';

type CreateCarData = Omit<Car, 'id' | 'modelId' | 'status'> & {
  manufacturer: string;
  model: string;
};
type GetCarListInfo = Omit<Car, 'companyId' | 'modelId'>;
type UpdateCarData = Partial<CreateCarData>;

export async function createCar(data: CreateCarData): Promise<CarInfo> {
  const manufacturer = await manufacturerRepository.getManufacturerByName(data.manufacturer);
  if (!manufacturer) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const carModel = await carsModelRepository.getCarModelByModel(data.model, manufacturer.id);
  if (!carModel) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const carType = await carsTypeRepository.getCarTypeById(carModel.id);
  if (!carType) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const car = await carsRepository.createCar({
    carNumber: data.carNumber,
    manufacturingYear: data.manufacturingYear,
    mileage: data.mileage,
    price: data.price,
    accidentCount: data.accidentCount,
    explanation: data.explanation || '',
    accidentDetails: data.accidentDetails || '',
    companyId: data.companyId,
    modelId: carModel.id,
  });

  return {
    ...car,
    manufacturer: manufacturer.name,
    model: carModel.model,
    type: carType.type,
    explanation: car.explanation ?? undefined,
    accidentDetails: car.accidentDetails ?? undefined,
  };
}

export async function getCarList(
  params: PagePaginationParams,
): Promise<PagePaginationResult<GetCarListInfo>> {
  const cars = await carsRepository.getCarList(params);
  return cars;
}

export async function updateCar(id: number, data: UpdateCarData): Promise<CarInfo> {
  if (!data.manufacturer || !data.model) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const manufacturer = await manufacturerRepository.getManufacturerByName(data.manufacturer);
  if (!manufacturer) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const carModel = await carsModelRepository.getCarModelByModel(data.model, manufacturer.id);
  if (!carModel) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const carType = await carsTypeRepository.getCarTypeById(carModel.id);
  if (!carType) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const updatedCar = await carsRepository.updateCar(id, {
    carNumber: data.carNumber,
    manufacturingYear: data.manufacturingYear,
    mileage: data.mileage,
    price: data.price,
    accidentCount: data.accidentCount,
    explanation: data.explanation || '',
    accidentDetails: data.accidentDetails || '',
    companyId: data.companyId,
    modelId: carModel.id,
  });

  return {
    ...updatedCar,
    manufacturer: manufacturer.name,
    model: carModel.model,
    type: carType.type,
    explanation: updatedCar.explanation ?? undefined,
    accidentDetails: updatedCar.accidentDetails ?? undefined,
  };
}

export async function deleteCar(id: number): Promise<void> {
  await carsRepository.deleteCar(id);
}

export async function getCar(id: number): Promise<CarInfo> {
  const car = await carsRepository.getCar(id);
  if (!car) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const carModel = await carsModelRepository.getCarModelById(car.modelId);
  if (!carModel) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const manufacturer = await manufacturerRepository.getManufacturerById(carModel.manufacturerId);
  if (!manufacturer) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const carType = await carsTypeRepository.getCarTypeById(carModel.id);
  if (!carType) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  return {
    ...car,
    manufacturer: manufacturer.name,
    model: carModel.model,
    type: carType.type,
    explanation: car.explanation ?? undefined,
    accidentDetails: car.accidentDetails ?? undefined,
  };
}

export async function getCarModelList() {
  const carModels = await manufacturerRepository.getManufacturerList();
  return carModels;
}
