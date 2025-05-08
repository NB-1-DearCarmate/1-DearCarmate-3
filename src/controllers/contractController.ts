import { Request, Response } from 'express';
import contractService from '../services/contractService';
import {
  ContractForResponse,
  ResponseCarDropdownDTO,
  ResponseContractDTO,
  ResponseContractListDTO,
  ResponseCustomerDropdownDTO,
  ResponseUserDropdownDTO,
} from '../lib/dtos/contractDTO';
import { create, validate } from 'superstruct';
import { ContractCreateStruct } from '../structs/contractStructs';
import CommonError from '../lib/errors/CommonError';
import { sendEmail } from '../lib/emailHandler';
import { OmittedUser } from '../types/OmittedUser';
import { USER_ROLE } from '@prisma/client';
import UnauthError from '../lib/errors/UnauthError';
import { SearchParamsStruct } from '../structs/commonStructs';

/**
 * @openapi
 * /contracts:
 *   post:
 *     summary: 계약 생성
 *     description: 새로운 계약을 생성합니다. 생성된 계약 정보가 반환됩니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: 생성할 계약 정보를 포함합니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: number
 *               carId:
 *                 type: number
 *               userId:
 *                 type: number
 *               companyId:
 *                 type: number
 *               contractPrice:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [VEHICLE_CHECKING, PRICE_CHECKING, CONTRACT_PREPARING, CONTRACT_SUCCESS, CONTRACT_FAILED]
 *               resolutionDate:
 *                 type: string
 *                 format: date-time
 *               meetings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     time:
 *                       type: string
 *                       format: date-time
 *           example:
 *             customerId: 2
 *             carId: 3
 *             userId: 1
 *             companyId: 1
 *             contractPrice: 15000000
 *             status: "VEHICLE_CHECKING"
 *             resolutionDate: null
 *             meetings:
 *               - time: "2025-05-10T14:00:00.000Z"
 *     responses:
 *       201:
 *         description: 계약과 관련된 회의가 성공적으로 생성되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseContractDTO'
 *             example:
 *               id: 1
 *               contractPrice: 15000000
 *               status: "VEHICLE_CHECKING"
 *               resolutionDate: null
 *               user:
 *                 id: 1
 *                 name: "김영업"
 *               customer:
 *                 id: 2
 *                 name: "홍길동"
 *               car:
 *                 id: 3
 *                 model: "소나타"
 *               meetings:
 *                 - date: "2025-05-10T14:00:00.000Z"
 *       400:
 *         description: 잘못된 요청입니다. 필수 필드가 누락되었거나 형식이 잘못되었을 수 있습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const createContract = async (req: Request, res: Response) => {
  const data = create(req.body, ContractCreateStruct);
  const contract = await contractService.createContractService(data);
  res.status(201).send(new ResponseContractDTO(contract));
};

/**
 * @openapi
 * /contracts/{contractId}:
 *   put:
 *     summary: 계약 수정
 *     description: 기존 계약 정보를 수정합니다. 새로운 계약 문서가 추가된 경우 고객에게 이메일이 전송됩니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contractId
 *         required: true
 *         description: 수정할 계약의 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: 수정할 계약 정보를 포함합니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: number
 *               carId:
 *                 type: number
 *               userId:
 *                 type: number
 *               companyId:
 *                 type: number
 *               contractPrice:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [VEHICLE_CHECKING, PRICE_CHECKING, CONTRACT_PREPARING, CONTRACT_SUCCESS, CONTRACT_FAILED]
 *               resolutionDate:
 *                 type: string
 *                 format: date-time
 *               meetings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     time:
 *                       type: string
 *                       format: date-time
 *               contractDocuments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     url:
 *                       type: string
 *           example:
 *             customerId: 2
 *             carId: 3
 *             userId: 1
 *             companyId: 1
 *             contractPrice: 16000000
 *             status: "CONTRACT_PREPARING"
 *             resolutionDate: "2025-05-12T12:00:00.000Z"
 *             meetings:
 *               - time: "2025-05-10T14:00:00.000Z"
 *             contractDocuments:
 *               - id: 1
 *                 name: "계약서"
 *                 url: "https://example.com/contract1.pdf"
 *     responses:
 *       200:
 *         description: 계약이 성공적으로 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contractPrice:
 *                   type: number
 *                 status:
 *                   type: string
 *                 resolutionDate:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                 userId:
 *                   type: number
 *                 customerId:
 *                   type: number
 *                 carId:
 *                   type: number
 *                 companyId:
 *                   type: number
 *                 meetings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                         format: date-time
 *                 contractDocuments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: number }
 *                       name: { type: string }
 *                       url: { type: string }
 *             example:
 *               contractPrice: 16000000
 *               status: "CONTRACT_PREPARING"
 *               resolutionDate: "2025-05-12T12:00:00.000Z"
 *               userId: 1
 *               customerId: 2
 *               carId: 3
 *               companyId: 1
 *               meetings:
 *                 - time: "2025-05-10T14:00:00.000Z"
 *               contractDocuments:
 *                 - id: 1
 *                   name: "계약서"
 *                   url: "https://example.com/contract1.pdf"
 *       400:
 *         description: 잘못된 요청입니다. 필수 필드가 누락되었거나 형식이 잘못되었을 수 있습니다.
 *       404:
 *         description: 해당 ID의 계약을 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const updateContract = async (req: Request, res: Response) => {
  const contractId = parseInt(req.params.contractId);

  const existingContract = await contractService.getContractByIdService(contractId);
  const existingDcmtId = new Set(existingContract?.contractDocuments.map((dcmt) => dcmt.id));
  const updated = await contractService.updateContractService(contractId, req.body);

  const { customer, createdAt, companyId, id, ...tempResponse } = updated;
  const isNewDocumentAdded = updated.contractDocuments.some(
    (dcmt: { id: number }) => !existingDcmtId.has(dcmt.id),
  );

  if (isNewDocumentAdded) {
    sendEmail(customer.email);
  }

  res.send(tempResponse);
};

/**
 * @openapi
 * /contracts:
 *   get:
 *     summary: 계약 목록 조회
 *     description: 계약 목록을 조회합니다. 직원 또는 대표 권한을 가진 사용자만 접근할 수 있습니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchBy
 *         required: true
 *         description: 검색 기준을 선택합니다
 *         schema:
 *           type: string
 *           enum: [customerName, carModel]
 *       - in: query
 *         name: keyword
 *         required: false
 *         description: 검색할 키워드입니다
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 계약 목록이 성공적으로 조회되었습니다
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseContractListDTO'
 *       401:
 *         description: 권한이 없는 사용자입니다
 *       500:
 *         description: 서버 오류가 발생했습니다
 */
const getAllContracts = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE && reqUser.role !== USER_ROLE.OWNER) {
    throw new UnauthError();
  }
  const params = create(req.query, SearchParamsStruct);
  const contracts = await contractService.getAllContractsService(params, reqUser.companyId);
  res.send(new ResponseContractListDTO(contracts));
};

/**
 * @openapi
 * /contracts/{contractId}:
 *   delete:
 *     summary: 계약 삭제
 *     description: 특정 계약을 삭제합니다. 계약을 등록한 회사의 직원만 삭제할 수 있습니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contractId
 *         required: true
 *         description: 삭제할 계약의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 계약이 성공적으로 삭제되었습니다
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 계약이 삭제되었습니다.
 *       403:
 *         description: 해당 계약에 대한 삭제 권한이 없습니다
 *       404:
 *         description: 계약을 찾을 수 없습니다
 *       500:
 *         description: 서버 오류가 발생했습니다
 */
const deleteContract = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  const id = parseInt(req.params.contractId);
  const existingContract = await contractService.getContractByIdService(id);
  if (reqUser.companyId !== existingContract?.companyId) {
    throw new CommonError('담당자만 삭제가 가능합니다.', 403);
  }
  await contractService.deleteContractService(id);
  res.send({ message: '계약이 삭제되었습니다.' });
};

/**
 * @openapi
 * /contracts/customers:
 *   get:
 *     summary: 고객 드롭다운 목록 조회
 *     description: 사용자의 회사에 속한 고객 목록을 조회하여 드롭다운 형식으로 반환합니다.
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 고객 목록을 성공적으로 조회하였습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   data:
 *                     type: string
 *                     example: "홍길동"
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const getCustomerDropdown = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  const customers = await contractService.getCustomerDropdownService(reqUser.companyId);
  res.send(new ResponseCustomerDropdownDTO(customers));
};

/**
 * @openapi
 * /contracts/users:
 *   get:
 *     summary: 사용자 드롭다운 목록 조회
 *     description: 사용자의 회사에 속한 사용자 목록을 조회하여 드롭다운 형식으로 반환합니다.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 목록을 성공적으로 조회하였습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   data:
 *                     type: string
 *                     example: "홍길동"
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const getUserDropdown = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  const users = await contractService.getUserDropdownService(reqUser.companyId);
  res.send(new ResponseUserDropdownDTO(users));
};

/**
 * @openapi
 * /contracts/cars:
 *   get:
 *     summary: 차량 드롭다운 목록 조회
 *     description: 사용자의 회사에 속한 차량 목록을 조회하여 드롭다운 형식으로 반환합니다.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 차량 목록을 성공적으로 조회하였습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   data:
 *                     type: string
 *                     example: "레이(01더 0101)"
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const getCarDropdown = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  const cars = await contractService.getCarDropdownService(reqUser.companyId);
  res.send(new ResponseCarDropdownDTO(cars));
};

export default {
  createContract,
  updateContract,
  getAllContracts,
  deleteContract,
  getCustomerDropdown,
  getUserDropdown,
  getCarDropdown,
};
