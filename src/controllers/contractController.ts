import { Request, Response } from 'express';
import contractService from '../services/contractService';
import { validate } from 'superstruct';
import { ContractCreateStruct } from '../structs/contractStructs';
import CommonError from '../lib/errors/CommonError';
import { CONTRACT_STATUS } from '@prisma/client';
import { sendEmail } from '../lib/emailHandler';

const createContract = async (req: Request, res: Response) => {
  const [error] = validate(req.body, ContractCreateStruct);
  if (error) {
    throw new CommonError('계약 생성 요청 형식이 올바르지 않습니다.', 400);
  }

  const contract = await contractService.createContractService(req.body);
  res.status(201).json(contract);
};

const updateContract = async (req: Request, res: Response) => {
  const contractId = parseInt(req.params.id);

  // 이메일 전송로직 추가
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
