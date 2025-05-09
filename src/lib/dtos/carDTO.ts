import { CreateCarBodyType, UpdateCarBodyType } from '../../structs/carsStructs';
import Car from '../../types/Car';
import CarInfo from '../../types/CarInfo';

// export const carResponseDTO = (car: Car) => {
//   const { companyId, modelId, ...carWithoutCompanyId } = car;
//   return carWithoutCompanyId;
// };

export class CarResponseDTO {
  id: number;
  carNumber: string;
  manufacturingYear: number;
  mileage: number;
  price: number;
  accidentCount: number;
  explanation: string;
  accidentDetails: string;
  status: string;
  manufacturer: string;
  model: string;
  type: string;

  constructor(car: Car) {
    this.id = car.id;
    this.carNumber = car.carNumber;
    this.manufacturingYear = car.manufacturingYear;
    this.mileage = car.mileage;
    this.price = car.price;
    this.accidentCount = car.accidentCount;
    this.explanation = car.explanation || '';
    this.accidentDetails = car.accidentDetails || '';
    this.status = car.status;
    this.manufacturer = car.manufacturer;
    this.model = car.model;
    this.type = car.type;
  }
}

export class CreateCarDTO {
  carNumber: string;
  manufacturingYear: number;
  mileage: number;
  price: number;
  accidentCount: number;
  explanation: string;
  accidentDetails: string;
  companyId: number;
  modelId: number;

  constructor(data: CreateCarBodyType, companyId: number, modelId: number) {
    this.carNumber = data.carNumber;
    this.manufacturingYear = data.manufacturingYear;
    this.mileage = data.mileage;
    this.price = data.price;
    this.accidentCount = data.accidentCount;
    this.explanation = data.explanation || '';
    this.accidentDetails = data.accidentDetails || '';
    this.companyId = companyId;
    this.modelId = modelId;
  }
}

export class UpdateCarDTO {
  carNumber?: string;
  manufacturingYear?: number;
  mileage?: number;
  price?: number;
  accidentCount?: number;
  explanation?: string;
  accidentDetails?: string;
  modelId?: number;

  constructor(data: UpdateCarBodyType, modelId: number) {
    if (data.carNumber !== undefined) this.carNumber = data.carNumber;
    if (data.manufacturingYear !== undefined) this.manufacturingYear = data.manufacturingYear;
    if (data.mileage !== undefined) this.mileage = data.mileage;
    if (data.price !== undefined) this.price = data.price;
    if (data.accidentCount !== undefined) this.accidentCount = data.accidentCount;
    if (data.explanation !== undefined) this.explanation = data.explanation ?? '';
    if (data.accidentDetails !== undefined) this.accidentDetails = data.accidentDetails ?? '';
    this.modelId = modelId;
  }
}

export class ResponseCarListDTO {
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
  data: Omit<CarInfo, 'companyId' | 'modelId'>[];

  constructor(
    page: number,
    pageSize: number,
    result: { totalItemCount: number; mappedCars: Omit<CarInfo, 'companyId' | 'modelId'>[] },
  ) {
    this.currentPage = page;
    this.totalPages = Math.ceil(result.totalItemCount / pageSize);
    this.totalItemCount = result.totalItemCount;
    this.data = result.mappedCars;
  }
}

class ResponseCarModelDTO {
  manufacturer: string;
  model: string[];

  constructor(manufacturer: string, models: string[]) {
    this.manufacturer = manufacturer;
    this.model = models;
  }
}

export class ResponseCarModelListDTO {
  data: ResponseCarModelDTO[];

  constructor(manufacturers: { name: string; carModels: { model: string }[] }[]) {
    this.data = manufacturers
      .filter((manufacturer) => manufacturer.carModels.length > 0)
      .map(
        (manufacturer) =>
          new ResponseCarModelDTO(
            manufacturer.name,
            manufacturer.carModels.map((carModel) => carModel.model),
          ),
      );
  }
}
