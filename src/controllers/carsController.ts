import { Request, Response } from 'express';
import { create } from 'superstruct';
import {
  CreateCarBodyStruct,
  GetCarListParamsStruct,
  UpdateCarBodyStruct,
} from '../structs/carsStructs';
import * as carsService from '../services/carsService';
import carResponseDTO from '../lib/dtos/carResponseDTO';
import { CarIdParamsStruct } from '../structs/commonStructs';
import { OmittedUser } from '../../types/OmittedUser';

export async function createCar(req: Request, res: Response) {
  const reqUser = req.user as OmittedUser;
  const data = create(req.body, CreateCarBodyStruct);
  const createdCar = await carsService.createCar({
    ...data,
    companyId: reqUser.companyId,
  });
  res.status(201).json(carResponseDTO(createdCar));
}

export async function getCarList(req: Request, res: Response) {
  const params = create(req.query, GetCarListParamsStruct);
  const result = await carsService.getCarList(params);
  res.send(result);
}

export async function updateCar(req: Request, res: Response) {
  const { carId } = create(req.params, CarIdParamsStruct);
  const data = create(req.body, UpdateCarBodyStruct);
  const updatedCar = await carsService.updateCar(carId, data);
  res.send(carResponseDTO(updatedCar));
}

export async function deleteCar(req: Request, res: Response) {
  const { carId } = create(req.params, CarIdParamsStruct);
  await carsService.deleteCar(carId);
  res.status(200).send({ message: '차량 삭제 성공' });
}

export async function getCar(req: Request, res: Response) {
  const { carId } = create(req.params, CarIdParamsStruct);
  const car = await carsService.getCar(carId);
  res.send(carResponseDTO(car));
}

export async function getCarModelList(req: Request, res: Response) {
  const result = await carsService.getCarModelList();
  res.send(result);
}
