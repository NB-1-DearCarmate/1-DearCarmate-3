import { Request, Response } from 'express';
import contractService from '../services/contractService';
import { validate } from 'superstruct';
import { ContractCreateStruct } from '../structs/contractStructs';
import CommonError from '../lib/errors/CommonError';
import { CONTRACT_STATUS } from '@prisma/client';
import { sendEmail } from '../lib/emailHandler';
/**
 * @openapi
 * /contracts:
 *   post:
 *     summary: 계약 생성
 *     description: 새로운 계약을 생성하고, 관련 회의를 설정합니다.
 *     tags:
 *       - Contract
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: number
 *                 description: 계약을 체결한 차량의 ID
 *                 example: 1
 *               customerId:
 *                 type: number
 *                 description: 계약을 체결한 고객의 ID
 *                 example: 2
 *               meetings:
 *                 type: array
 *                 description: 계약에 관련된 회의 목록
 *                 items:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: 회의 일자
 *                       example: "2024-02-22"
 *     responses:
 *       201:
 *         description: 계약과 관련된 회의가 성공적으로 생성되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContractResponseDTO'
 *       400:
 *         description: 잘못된 요청입니다. 계약 생성 요청 형식이 올바르지 않습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const createContract = async (req: Request, res: Response) => {
  const [error] = validate(req.body, ContractCreateStruct);
  if (error) {
    throw new CommonError('계약 생성 요청 형식이 올바르지 않습니다.', 400);
  }
  const contract = await contractService.createContractService(req.body);
  res.status(201).json(contract);
};

/**
 * @openapi
 * /contracts/{id}:
 *   patch:
 *     summary: 계약 정보 수정
 *     description: 계약 정보를 수정하고, 새 문서가 추가된 경우 고객에게 이메일을 전송합니다.
 *     tags:
 *       - Contract
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 계약 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContractUpdateDTO'
 *     responses:
 *       200:
 *         description: 계약 정보가 성공적으로 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: 수정된 계약 정보
 *               example:
 *                 id: 1
 *                 status: "COMPLETED"
 *                 contractPrice: 9500000
 *                 createdAt: "2024-02-01T12:34:56.000Z"
 *                 resolutionDate: "2024-03-01T00:00:00.000Z"
 *       400:
 *         description: 잘못된 요청입니다.
 *       404:
 *         description: 계약을 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const updateContract = async (req: Request, res: Response) => {
  const contractId = parseInt(req.params.id);
  const existingContract = await contractService.getContractByIdService(contractId);
  const existingDcmtId = new Set(existingContract?.contractDocuments.map((dcmt) => dcmt.id));
  const updated = await contractService.updateContractService(contractId, req.body);
  const { contractDocuments, customer, ...tempResponse } = updated;
  const isNewDocumentAdded = contractDocuments.some(
    (dcmt: { id: number }) => !existingDcmtId.has(dcmt.id),
  );

  if (isNewDocumentAdded) {
    sendEmail(customer.email);
  }
  res.status(200).json(tempResponse);
};

const getAllContracts = async (req: Request, res: Response) => {
  const contracts = await contractService.getAllContractsService();
  res.status(200).json(contracts);
};

const getContractById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const contract = await contractService.getContractByIdService(id);
  if (!contract) {
    throw new CommonError('계약을 찾을 수 없습니다.', 404);
  }
  res.status(200).json(contract);
};

const deleteContract = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await contractService.deleteContractService(id);
  res.status(200).json({ message: '계약이 삭제되었습니다.' });
};

const updateContractStatus = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { status, resolutionDate } = req.body;

  if (!Object.values(CONTRACT_STATUS).includes(status)) {
    throw new CommonError('유효하지 않은 계약 상태입니다.', 400);
  }

  const updated = await contractService.updateContractStatusService(id, status, resolutionDate);
  res.status(200).json(updated);
};

const getCustomerDropdown = async (req: Request, res: Response) => {
  const companyId = (req.user as { companyId: number })?.companyId;
  if (!companyId) {
    throw new CommonError('회사 정보가 없습니다.', 400);
  }

  const customers = await contractService.getCustomerDropdownService(companyId);
  res.status(200).json(customers);
};

const getUserDropdown = async (req: Request, res: Response) => {
  const companyId = (req.user as { companyId: number })?.companyId;
  if (!companyId) {
    throw new CommonError('회사 정보가 없습니다.', 400);
  }

  const users = await contractService.getUserDropdownService(companyId);
  res.status(200).json(users);
};

const getCarDropdown = async (req: Request, res: Response) => {
  const companyId = (req.user as { companyId: number })?.companyId;
  if (!companyId) {
    throw new CommonError('회사 정보가 없습니다.', 400);
  }

  const cars = await contractService.getCarDropdownService(companyId);
  res.status(200).json(cars);
};

export default {
  createContract,
  updateContract,
  getAllContracts,
  getContractById,
  deleteContract,
  updateContractStatus,
  getCustomerDropdown,
  getUserDropdown,
  getCarDropdown,
};
