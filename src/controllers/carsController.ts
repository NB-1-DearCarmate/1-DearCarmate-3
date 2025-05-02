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
import { OmittedUser } from '../types/OmittedUser';

/**
 * @openapi
 * /cars:
 *   post:
 *     summary: 차량 등록
 *     description: 차량 정보를 등록합니다.
 *     tags:
 *       - Car
 *     security:
 *       - accessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCarBody'
 *     responses:
 *       201:
 *         description: 차량 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponseDTO'
 */
export async function createCar(req: Request, res: Response) {
  const reqUser = req.user as OmittedUser;
  const data = create(req.body, CreateCarBodyStruct);
  const createdCar = await carsService.createCar({
    ...data,
    companyId: reqUser.companyId,
  });
  res.status(201).json(carResponseDTO(createdCar));
}

/**
 * @openapi
 * /cars:
 *   get:
 *     summary: 차량 목록 조회
 *     description: 차량 목록을 조회합니다.
 *     tags:
 *       - Car
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *         description: 페이지 번호 (기본값: 1)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *         description: 페이지당 항목 수 (기본값: 10)
 *     responses:
 *       200:
 *         description: 차량 목록 조회 성공
 */
export async function getCarList(req: Request, res: Response) {
  const params = create(req.query, GetCarListParamsStruct);
  const result = await carsService.getCarList(params);
  res.send(result);
}

/**
 * @openapi
 * /cars/{carId}:
 *   put:
 *     summary: 차량 정보 수정
 *     description: 차량 정보를 수정합니다.
 *     tags:
 *       - Car
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: number
 *         description: 수정할 차량의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCarBody'
 *     responses:
 *       200:
 *         description: 차량 정보 수정 성공
 */
export async function updateCar(req: Request, res: Response) {
  const { carId } = create(req.params, CarIdParamsStruct);
  const data = create(req.body, UpdateCarBodyStruct);
  const updatedCar = await carsService.updateCar(carId, data);
  res.send(carResponseDTO(updatedCar));
}

/**
 * @openapi
 * /cars/{carId}:
 *   delete:
 *     summary: 차량 삭제
 *     description: 차량을 삭제합니다.
 *     tags:
 *       - Car
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: number
 *         description: 삭제할 차량의 ID
 *     responses:
 *       200:
 *         description: 차량 삭제 성공
 */
export async function deleteCar(req: Request, res: Response) {
  const { carId } = create(req.params, CarIdParamsStruct);
  await carsService.deleteCar(carId);
  res.status(200).send({ message: '차량 삭제 성공' });
}

/**
 * @openapi
 * /cars/{carId}:
 *   get:
 *     summary: 차량 정보 조회
 *     description: 특정 차량의 정보를 조회합니다.
 *     tags:
 *       - Car
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: number
 *         description: 조회할 차량의 ID
 *     responses:
 *       200:
 *         description: 차량 정보 조회 성공
 */
export async function getCar(req: Request, res: Response) {
  const { carId } = create(req.params, CarIdParamsStruct);
  const car = await carsService.getCar(carId);
  res.send(carResponseDTO(car));
}

/**
 * @openapi
 * /cars/models:
 *   get:
 *     summary: 차량 모델 목록 조회
 *     description: 차량 모델 목록을 조회합니다.
 *     tags:
 *       - Car
 *     security:
 *       - accessToken: []
 *     responses:
 *       200:
 *         description: 차량 모델 목록 조회 성공
 */
export async function getCarModelList(req: Request, res: Response) {
  const result = await carsService.getCarModelList();
  res.send(result);
}
