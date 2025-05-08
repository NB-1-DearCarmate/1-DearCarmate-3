import BadRequestError from '../lib/errors/BadRequestError';
import * as carsRepository from '../repositories/carsRepository';
import * as manufacturerRepository from '../repositories/manufacturerRepository';
import * as carsModelRepository from '../repositories/carsModelRepository';
import * as carsTypeRepository from '../repositories/carsTypeRepository';
import Car from '../types/Car';
import CarInfo from '../types/CarInfo';
import { PagePaginationParams } from '../types/pagination';
import { CreateCarBodyType, UpdateCarBodyType } from '../structs/carsStructs';
import { CreateCarDTO, UpdateCarDTO } from '../lib/dtos/carDTO';

type CreateCarData = Omit<Car, 'id' | 'modelId' | 'status' | 'manufacturer' | 'model' | 'type'> & {
  manufacturer: string;
  model: string;
};

export async function createCar(data: CreateCarBodyType, companyId: number) {
  const manufacturer = await manufacturerRepository.getManufacturerByName(data.manufacturer);
  if (!manufacturer) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const carModel = await carsModelRepository.getCarModelByModel(data.model, manufacturer.id);
  if (!carModel) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const carType = await carsTypeRepository.getCarTypeById(carModel.typeId);
  if (!carType) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const car = await carsRepository.createCar(new CreateCarDTO(data, companyId, carModel.id));

  return {
    ...car,
    manufacturer: manufacturer.name,
    model: carModel.model,
    type: carType.type,
    explanation: car.explanation ?? undefined,
    accidentDetails: car.accidentDetails ?? undefined,
  };
}

export async function getCarList(params: PagePaginationParams) {
  return await carsRepository.getCarList(params);
}

export async function updateCar(id: number, data: UpdateCarBodyType): Promise<CarInfo> {
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

  const carType = await carsTypeRepository.getCarTypeById(carModel.typeId);
  if (!carType) {
    throw new BadRequestError('잘못된 요청입니다');
  }

  const updatedCar = await carsRepository.updateCar(id, new UpdateCarDTO(data, carModel.id));

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

  const carType = await carsTypeRepository.getCarTypeById(carModel.typeId);
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
  return await manufacturerRepository.getManufacturerList();
}

export async function carUpload(data: CreateCarData[]) {
  const mappedCars = await Promise.all(
    data.map(async (item) => {
      const manufacturer = await manufacturerRepository.getManufacturerByName(item.manufacturer);
      if (!manufacturer) {
        throw new BadRequestError('잘못된 요청입니다');
      }

      const carModel = await carsModelRepository.getCarModelByModel(item.model, manufacturer.id);
      if (!carModel) {
        throw new BadRequestError('잘못된 요청입니다');
      }

      const carType = await carsTypeRepository.getCarTypeById(carModel.typeId);
      if (!carType) {
        throw new BadRequestError('잘못된 요청입니다');
      }

      return {
        carNumber: item.carNumber,
        manufacturingYear: item.manufacturingYear,
        mileage: item.mileage,
        price: item.price,
        accidentCount: item.accidentCount,
        explanation: item.explanation || '',
        accidentDetails: item.accidentDetails || '',
        companyId: item.companyId,
        modelId: carModel.id,
      };
    }),
  );

  const carUpload = await carsRepository.createCars(mappedCars);

  return carUpload;
}
