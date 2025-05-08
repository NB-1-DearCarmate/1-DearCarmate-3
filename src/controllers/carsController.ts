import { Request, Response } from 'express';
import { create } from 'superstruct';
import {
  BulkCreateCarBodyStruct,
  CreateCarBodyStruct,
  GetCarListParamsStruct,
  UpdateCarBodyStruct,
} from '../structs/carsStructs';
import * as carsService from '../services/carsService';
import { CarResponseDTO, ResponseCarListDTO, ResponseCarModelListDTO } from '../lib/dtos/carDTO';
import { CarIdParamsStruct } from '../structs/commonStructs';
import { OmittedUser } from '../types/OmittedUser';
import BadRequestError from '../lib/errors/BadRequestError';
import csv from 'csvtojson';

/**
 * @openapi
 * /cars:
 *   post:
 *     summary: 차량 등록
 *     description: 차량 정보를 등록합니다. 요청된 차량 정보는 해당 사용자가 속한 회사에 등록됩니다.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carNumber:
 *                 type: string
 *                 example: "12가1234"
 *               manufacturer:
 *                 type: string
 *                 example: "Hyundai"
 *               model:
 *                 type: string
 *                 example: "Sonata"
 *               manufacturingYear:
 *                 type: integer
 *                 example: 2020
 *               mileage:
 *                 type: integer
 *                 example: 15000
 *               price:
 *                 type: integer
 *                 example: 20000000
 *               accidentCount:
 *                 type: integer
 *                 example: 1
 *               explanation:
 *                 type: string
 *                 example: "좋은 상태의 차량입니다."
 *               accidentDetails:
 *                 type: string
 *                 example: "소소한 교차로 접촉사고"
 *     responses:
 *       201:
 *         description: 차량 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponseDTO'
 *       400:
 *         description: 잘못된 요청. 요청 본문이 유효하지 않거나 필수 필드가 누락된 경우
 *       401:
 *         description: 인증 실패. 유효하지 않은 액세스 토큰
 *       500:
 *         description: 서버 오류. 차량 등록 처리 중 오류 발생
 */

export async function createCar(req: Request, res: Response) {
  const reqUser = req.user as OmittedUser;
  const data = create(req.body, CreateCarBodyStruct);
  const createdCar = await carsService.createCar(data, reqUser.companyId);
  res.status(201).json(new CarResponseDTO(createdCar));
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
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *           default: 10
 *         description: 페이지당 항목 수
 *     responses:
 *       200:
 *         description: 차량 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: number
 *                   description: 현재 페이지 번호
 *                 totalPages:
 *                   type: number
 *                   description: 전체 페이지 수
 *                 totalItemCount:
 *                   type: number
 *                   description: 전체 항목 수
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: 차량 ID
 *                       model:
 *                         type: string
 *                         description: 차량 모델
 *                       manufacturer:
 *                         type: string
 *                         description: 제조사
 *                       year:
 *                         type: number
 *                         description: 제조 연도
 *                       price:
 *                         type: number
 *                         description: 가격
 *                       status:
 *                         type: string
 *                         description: 차량 상태
 *               required:
 *                 - currentPage
 *                 - totalPages
 *                 - totalItemCount
 *                 - data
 */
export async function getCarList(req: Request, res: Response) {
  const params = create(req.query, GetCarListParamsStruct);
  const result = await carsService.getCarList(params);
  res.send(new ResponseCarListDTO(params.page, params.pageSize, result));
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
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               carNumber:
 *                 type: string
 *                 description: 차량 번호, 선택사항
 *               manufacturingYear:
 *                 type: number
 *                 description: 제조 연도, 선택사항
 *               mileage:
 *                 type: number
 *                 description: 차량의 주행 거리, 선택사항
 *               price:
 *                 type: number
 *                 description: 차량 가격, 선택사항
 *               accidentCount:
 *                 type: number
 *                 description: 차량의 사고 횟수, 선택사항
 *               explanation:
 *                 type: string
 *                 description: 차량 설명, 선택사항
 *               accidentDetails:
 *                 type: string
 *                 description: 사고 세부 사항, 선택사항
 *     responses:
 *       200:
 *         description: 차량 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponseDTO'
 */
export async function updateCar(req: Request, res: Response) {
  const { carId } = create(req.params, CarIdParamsStruct);
  const data = create(req.body, UpdateCarBodyStruct);
  const updatedCar = await carsService.updateCar(carId, data);
  res.send(new CarResponseDTO(updatedCar));
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
 *       - bearerAuth: []
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 차량 삭제 성공
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
 *       - bearerAuth: []
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponseDTO'
 */
export async function getCar(req: Request, res: Response) {
  const { carId } = create(req.params, CarIdParamsStruct);
  const car = await carsService.getCar(carId);
  res.send(new CarResponseDTO(car));
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
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 차량 모델 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCarModelListDTO'
 */
export async function getCarModelList(req: Request, res: Response) {
  const result = await carsService.getCarModelList();
  res.send(new ResponseCarModelListDTO(result));
}

export async function carUpload(req: Request, res: Response) {
  const reqUser = req.user as OmittedUser;
  if (!req.file) {
    throw new BadRequestError('CSV 파일이 업로드되지 않았습니다.');
  }

  const filePath = req.file.path;

  const jsonArray = await csv().fromFile(filePath);

  const parsedArray = jsonArray.map((item) => ({
    carNumber: item.carNumber,
    manufacturer: item.manufacturer,
    model: item.model,
    manufacturingYear: parseInt(item.manufacturingYear, 10),
    mileage: parseInt(item.mileage, 10),
    price: parseInt(item.price, 10),
    accidentCount: parseInt(item.accidentCount, 10),
    explanation: item.explanation,
    accidentDetails: item.accidentDetails,
  }));

  const validatedData = create(parsedArray, BulkCreateCarBodyStruct);

  const dataWithCompanyId = validatedData.map((item) => ({
    ...item,
    companyId: reqUser.companyId,
  }));
  const createdCars = await carsService.carUpload(dataWithCompanyId);

  res.status(200).send({ message: '성공적으로 등록되었습니다' });
}
